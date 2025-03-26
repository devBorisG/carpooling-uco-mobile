/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, Animated, Platform, Easing } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Componentes
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/SideBar";

// Hooks y servicios
import { useUserLocation, useMapControls, usePulseAnimation, createAnimatedCoordinate } from "../utils/mapHooks";

// Constantes
import { COLORS, MOCK_DATA, SCREENS } from "../utils/constants";

/**
 * Pantalla principal con mapa y vehículos cercanos
 * @returns {JSX.Element} Componente HomeScreen
 */
const HomeScreen = () => {
    const navigation = useNavigation();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [mockCars, setMockCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [showRouteInfo, setShowRouteInfo] = useState(false);
    const mapRef = useRef(null);
    const [hasActiveTrip, setHasActiveTrip] = useState(true);

    // Hooks personalizados
    const { region } = useUserLocation();
    const { resetMapHeading, centerOnUser, zoomIn, zoomOut } = useMapControls(mapRef, region);
    const pulseAnim = usePulseAnimation();

    // Generar vehículos simulados cuando la región esté disponible
    useEffect(() => {
        if (region && mockCars.length === 0) {
            const generateMockCars = () => {
                return Array.from({ length: 10 }).map((_, index) => ({
                    id: index + 1,
                    name: MOCK_DATA.DRIVER_NAMES[index % MOCK_DATA.DRIVER_NAMES.length],
                    // Se genera una posición aleatoria cerca de la ubicación del usuario
                    animatedCoordinate: createAnimatedCoordinate(
                        region.latitude + (Math.random() * 0.03 - 0.015),
                        region.longitude + (Math.random() * 0.03 - 0.015)
                    ),
                    rotation: Math.random() * 360,
                    // Destino simulado para cada conductor
                    destination: {
                        latitude: region.latitude + (Math.random() * 0.05 - 0.025),
                        longitude: region.longitude + (Math.random() * 0.05 - 0.025),
                        name: MOCK_DATA.DESTINATIONS[Math.floor(Math.random() * MOCK_DATA.DESTINATIONS.length)]
                    },
                    // Información adicional del viaje
                    tripInfo: {
                        estimatedTime: Math.floor(Math.random() * 30) + 5, // 5-35 minutos
                        distance: (Math.random() * 10 + 1).toFixed(1), // 1-11 km
                        price: Math.floor(Math.random() * 15000) + 5000, // 5000-20000 pesos
                        availableSeats: Math.floor(Math.random() * 3) + 1 // 1-3 asientos
                    }
                }));
            };
            setMockCars(generateMockCars());
        }
    }, [region]);

    // Simula el movimiento de los vehículos
    useEffect(() => {
        if (mockCars.length > 0) {
            const intervalId = setInterval(() => {
                mockCars.forEach((car) => {
                    const currentPos = car.animatedCoordinate.__getValue();

                    // Si hay un destino, mover ligeramente hacia él
                    let newLatitude, newLongitude;

                    if (car.destination) {
                        const latDiff = car.destination.latitude - currentPos.latitude;
                        const lngDiff = car.destination.longitude - currentPos.longitude;

                        // Calcular la distancia al destino
                        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

                        // Si está muy cerca del destino, reducir la velocidad
                        const speed = distance < 0.002 ? 0.01 : 0.02;

                        // Mover un pequeño porcentaje hacia el destino
                        newLatitude = currentPos.latitude + (latDiff * speed);
                        newLongitude = currentPos.longitude + (lngDiff * speed);

                        // Actualizar la rotación del vehículo para que apunte en la dirección del movimiento
                        const angle = Math.atan2(lngDiff, latDiff) * (180 / Math.PI);
                        car.rotation = angle;
                    } else {
                        // Movimiento aleatorio si no hay destino
                        newLatitude = currentPos.latitude + (Math.random() * 0.001 - 0.0005);
                        newLongitude = currentPos.longitude + (Math.random() * 0.001 - 0.0005);

                        // Rotación aleatoria
                        car.rotation = Math.random() * 360;
                    }

                    // Animación más suave con easing
                    car.animatedCoordinate.timing({
                        latitude: newLatitude,
                        longitude: newLongitude,
                        duration: 2000,
                        useNativeDriver: false,
                        easing: Easing.linear,
                    }).start();
                });
            }, 2000);

            return () => clearInterval(intervalId);
        }
    }, [mockCars]);

    // Acciones del Footer
    const handleMenuPress = () => {
        setSidebarVisible((prev) => !prev);
    };

    const handleHomePress = () => {
        setSidebarVisible(false);
        navigation.navigate(SCREENS.HOME);
    };

    const handleOptionPress = (option) => {
        console.log("Opción seleccionada:", option);
        setSidebarVisible(false);

        // Manejo de opciones del menú
        switch (option) {
            case "Cerrar sesión":
                navigation.navigate(SCREENS.LOGIN);
                break;
            default:
                break;
        }
    };

    // Función para generar una ruta simulada entre dos puntos
    const generateRoute = (start, end) => {
        // Generar puntos intermedios para simular una ruta
        const numPoints = 8;
        const points = [];

        // Añadir punto de inicio
        points.push({
            latitude: start.latitude,
            longitude: start.longitude
        });

        // Generar puntos intermedios con cierta variación para simular calles
        for (let i = 1; i < numPoints; i++) {
            const fraction = i / numPoints;

            // Interpolación lineal con algo de variación aleatoria
            const latitude = start.latitude + (end.latitude - start.latitude) * fraction + (Math.random() * 0.005 - 0.0025);
            const longitude = start.longitude + (end.longitude - start.longitude) * fraction + (Math.random() * 0.005 - 0.0025);

            points.push({
                latitude,
                longitude
            });
        }

        // Añadir punto final
        points.push({
            latitude: end.latitude,
            longitude: end.longitude
        });

        return points;
    };

    // Manejar selección de vehículo
    const handleCarPress = (car) => {
        console.log("Vehículo seleccionado:", car.name);
        setSelectedCar(car);

        // Generar ruta desde la posición actual del vehículo hasta su destino
        const currentPosition = car.animatedCoordinate.__getValue();
        const route = generateRoute(currentPosition, car.destination);
        setRouteCoordinates(route);

        // Mostrar información de la ruta
        setShowRouteInfo(true);

        // Ajustar el mapa para mostrar toda la ruta
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.fitToCoordinates(route, {
                    edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
                    animated: true
                });
            }, 100);
        }
    };

    // Cerrar información de ruta
    const handleCloseRouteInfo = () => {
        setShowRouteInfo(false);
        setSelectedCar(null);
        setRouteCoordinates([]);
    };

    const handleChatPress = () => {
        navigation.navigate(SCREENS.CHAT);
    };

    if (!region) {
        return <LoadingView />;
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}
                showsUserLocation={false}
                showsCompass={false}
                showsMyLocationButton={false}
                showsTraffic={true}
                showsBuildings={true}
            >
                {/* Marcador de ubicación actual con animación de pulso */}
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                    <LocationMarker pulseAnim={pulseAnim} />
                </Marker>

                {/* Marcadores animados de vehículos cercanos */}
                {mockCars.map((car) => (
                    <Marker.Animated
                        key={car.id}
                        coordinate={car.animatedCoordinate}
                        onPress={() => handleCarPress(car)}
                    >
                        <VehicleMarker rotation={car.rotation} isSelected={selectedCar?.id === car.id} />
                    </Marker.Animated>
                ))}

                {/* Destino del conductor seleccionado */}
                {selectedCar && (
                    <Marker
                        coordinate={selectedCar.destination}
                        title={`Destino: ${selectedCar.destination.name}`}
                    >
                        <View style={styles.destinationMarker}>
                            <Ionicons name="location" size={30} color={COLORS.PRIMARY} />
                        </View>
                    </Marker>
                )}

                {/* Ruta del conductor seleccionado */}
                {routeCoordinates.length > 0 && (
                    <>
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeWidth={4}
                            strokeColor={COLORS.PRIMARY}
                            lineDashPattern={[0]}
                        />
                        {/* Línea de efecto para la ruta */}
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeWidth={8}
                            strokeColor="rgba(0, 71, 59, 0.2)"
                            lineDashPattern={[0]}
                            zIndex={-1}
                        />
                        {/* Puntos de inicio y fin de la ruta */}
                        <Marker
                            coordinate={routeCoordinates[0]}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View style={styles.routeStartPoint} />
                        </Marker>
                        <Marker
                            coordinate={routeCoordinates[routeCoordinates.length - 1]}
                            anchor={{ x: 0.5, y: 1 }}
                        >
                            <View style={styles.routeEndPointContainer}>
                                <Ionicons name="location" size={30} color={COLORS.PRIMARY} />
                            </View>
                        </Marker>
                    </>
                )}
            </MapView>

            {/* Controles del mapa mejorados */}
            <MapControls
                onCenterPress={centerOnUser}
                onZoomInPress={zoomIn}
                onZoomOutPress={zoomOut}
                onCompassPress={resetMapHeading}
            />

            {/* Barra de búsqueda */}
            <SearchBar onSearch={(text) => console.log("Búsqueda:", text)} />

            {/* Botón flotante para solicitar viaje */}
            {!showRouteInfo && (
                <TouchableOpacity
                    style={styles.requestRideFloatingButton}
                    activeOpacity={0.8}
                    onPress={() => 
                        // alert("Selecciona un vehículo para solicitar un viaje")
                        navigation.navigate(SCREENS.CREATE_ROUTE)
                    }
                >
                    <Ionicons name="car" size={24} color={COLORS.WHITE} style={styles.requestRideIcon} />
                    <Text style={styles.requestRideFloatingText}>Crear viaje</Text>
                </TouchableOpacity>
            )}

            {/* Información de la ruta seleccionada */}
            {showRouteInfo && selectedCar && (
                <RouteInfoCard
                    car={selectedCar}
                    onClose={handleCloseRouteInfo}
                    onRequestRide={() => {
                        // Navegación a la pantalla de viaje en progreso
                        navigation.navigate(SCREENS.RIDE_IN_PROGRESS, {
                            selectedCar,
                            routeCoordinates
                        });
                    }}
                />
            )}

            {/* Menú lateral */}
            <Sidebar
                visible={sidebarVisible}
                onClose={() => setSidebarVisible(false)}
                onOptionPress={handleOptionPress}
            />

            {/* Footer */}
            <Footer
                onMenuPress={handleMenuPress}
                onHomePress={handleHomePress}
                onTripPress={() => {}}
                onChatPress={handleChatPress}
                hasActiveTrip={hasActiveTrip}
            />
        </View>
    );
};

/**
 * Componente para mostrar durante la carga del mapa
 * @returns {JSX.Element} Componente LoadingView
 */
const LoadingView = () => (
    <View style={styles.loadingContainer}>
        <Ionicons name="location-outline" size={50} color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Cargando mapa...</Text>
    </View>
);

/**
 * Componente para la barra de búsqueda
 * @returns {JSX.Element} Componente SearchBar
 */
const SearchBar = ({ onSearch }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.GRAY} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="¿A dónde vas?"
                placeholderTextColor={COLORS.GRAY}
                onChangeText={onSearch}
            />
        </View>
    </View>
);

/**
 * Componente para los controles del mapa mejorados
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente MapControls
 */
const MapControls = ({ onCenterPress, onZoomInPress, onZoomOutPress, onCompassPress }) => (
    <View style={styles.mapControlsContainer}>
        <View style={styles.mapControls}>
            <TouchableOpacity
                style={styles.mapControlButton}
                onPress={onCenterPress}
                activeOpacity={0.7}
            >
                <Ionicons name="locate" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
            <View style={styles.controlDivider} />
            <TouchableOpacity
                style={styles.mapControlButton}
                onPress={onZoomInPress}
                activeOpacity={0.7}
            >
                <Ionicons name="add" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
            <View style={styles.controlDivider} />
            <TouchableOpacity
                style={styles.mapControlButton}
                onPress={onZoomOutPress}
                activeOpacity={0.7}
            >
                <Ionicons name="remove" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
            <View style={styles.controlDivider} />
            <TouchableOpacity
                style={styles.mapControlButton}
                onPress={onCompassPress}
                activeOpacity={0.7}
            >
                <Ionicons name="compass" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
        </View>
    </View>
);

/**
 * Componente para el marcador de ubicación actual
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente LocationMarker
 */
const LocationMarker = ({ pulseAnim }) => (
    <View style={styles.markerContainer}>
        <View style={styles.outerCircle} />
        <Animated.View style={[styles.pulsatingCircle, { transform: [{ scale: pulseAnim }] }]} />
        <View style={styles.innerCircle} />
    </View>
);

/**
 * Componente para el marcador de vehículo
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente VehicleMarker
 */
const VehicleMarker = ({ rotation, isSelected }) => (
    <View style={[
        styles.vehicleMarkerContainer,
        isSelected && styles.selectedVehicleMarker
    ]}>
        <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
            <Image
                source={require('../../assets/img/car-2d.png')}
                style={styles.carIcon}
            />
        </View>
        {isSelected && (
            <View style={styles.selectedIndicator} />
        )}
    </View>
);

/**
 * Componente para mostrar información de la ruta seleccionada
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente RouteInfoCard
 */
const RouteInfoCard = ({ car, onClose, onRequestRide }) => (
    <View style={styles.routeInfoContainer}>
        <View style={styles.routeInfoHeader}>
            <View style={styles.driverInfoContainer}>
                <View style={styles.driverAvatar}>
                    <Text style={styles.driverInitial}>{car.name.charAt(0)}</Text>
                </View>
                <View style={styles.driverDetails}>
                    <Text style={styles.driverName}>{car.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>4.8</Text>
                        <Text style={styles.tripCountText}> • 120 viajes</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color={COLORS.GRAY} />
            </TouchableOpacity>
        </View>

        <View style={styles.routeInfoContent}>
            <View style={styles.routeDetail}>
                <Ionicons name="time-outline" size={20} color={COLORS.PRIMARY} />
                <Text style={styles.routeDetailText}>{car.tripInfo.estimatedTime} min</Text>
            </View>
            <View style={styles.routeDetail}>
                <Ionicons name="navigate-outline" size={20} color={COLORS.PRIMARY} />
                <Text style={styles.routeDetailText}>{car.tripInfo.distance} km</Text>
            </View>
            <View style={styles.routeDetail}>
                <Ionicons name="cash-outline" size={20} color={COLORS.PRIMARY} />
                <Text style={styles.routeDetailText}>${car.tripInfo.price}</Text>
            </View>
            <View style={styles.routeDetail}>
                <Ionicons name="people-outline" size={20} color={COLORS.PRIMARY} />
                <Text style={styles.routeDetailText}>{car.tripInfo.availableSeats} asientos</Text>
            </View>
        </View>

        <View style={styles.destinationContainer}>
            <Ionicons name="location" size={20} color={COLORS.PRIMARY} />
            <Text style={styles.destinationText}>Destino: {car.destination.name}</Text>
        </View>

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.contactButton} onPress={() => alert(`Contactando a ${car.name}...`)}>
                <Ionicons name="chatbubble-outline" size={20} color={COLORS.PRIMARY} />
                <Text style={styles.contactButtonText}>Contactar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.requestRideButton} onPress={onRequestRide}>
                <Text style={styles.requestRideButtonText}>Solicitar Viaje</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BACKGROUND,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.PRIMARY,
    },
    searchContainer: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.BLACK,
    },
    mapControlsContainer: {
        position: "absolute",
        right: 20,
        top: Platform.OS === 'ios' ? 150 : 120,
        zIndex: 1,
    },
    mapControls: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    mapControlButton: {
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
    },
    controlDivider: {
        height: 1,
        backgroundColor: COLORS.LIGHT_GRAY,
        width: '80%',
        alignSelf: 'center',
    },
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent',
    },
    outerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(26, 115, 232, 0.2)",
        overflow: 'visible',
    },
    pulsatingCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "rgba(26, 115, 232, 0.4)",
        position: "absolute",
    },
    innerCircle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: "#1A73E8",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        position: "absolute",
    },
    vehicleMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    carIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: -5,
        width: 10,
        height: 10,
    },
    destinationMarker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeInfoContainer: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 20,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    routeInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    driverInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    driverInitial: {
        color: COLORS.WHITE,
        fontSize: 22,
        fontWeight: 'bold',
    },
    driverDetails: {
        justifyContent: 'center',
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.GRAY,
        fontWeight: '600',
    },
    closeButton: {
        padding: 8,
        backgroundColor: COLORS.LIGHT_GRAY,
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeInfoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    routeDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        minWidth: '45%',
    },
    routeDetailText: {
        marginLeft: 8,
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500',
    },
    destinationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(0, 71, 59, 0.1)',
        padding: 15,
        borderRadius: 15,
    },
    destinationText: {
        marginLeft: 10,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500',
        flex: 1,
    },
    requestRideButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flex: 1.5,
    },
    requestRideButtonText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    routeStartPoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.PRIMARY,
        borderWidth: 2,
        borderColor: COLORS.WHITE,
    },
    routeEndPointContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 71, 59, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    requestRideFloatingButton: {
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    requestRideIcon: {
        marginRight: 8,
    },
    requestRideFloatingText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripCountText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.GRAY,
        fontWeight: '600',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactButton: {
        backgroundColor: COLORS.BACKGROUND,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        flex: 1,
        marginRight: 10,
    },
    contactButtonText: {
        color: COLORS.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    requestRideButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flex: 1.5,
    },
});

export default HomeScreen;

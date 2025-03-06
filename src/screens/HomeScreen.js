/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, Animated, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

// Componentes
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/SideBar";
import { Ionicons } from "@expo/vector-icons";

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
    const mapRef = useRef(null);

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
                    const newLatitude = currentPos.latitude + (Math.random() * 0.001 - 0.0005);
                    const newLongitude = currentPos.longitude + (Math.random() * 0.001 - 0.0005);

                    car.animatedCoordinate.timing({
                        latitude: newLatitude,
                        longitude: newLongitude,
                        duration: 1000,
                        useNativeDriver: false,
                    }).start();
                });
            }, 3000);

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

    return (
        <View style={styles.container}>
            {region ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={region}
                    showsUserLocation={false}
                    showsCompass={false}
                    showsMyLocationButton={false}
                >
                    {/* Marcador de ubicación actual con animación de pulso */}
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                        <View style={styles.markerContainer}>
                            <View style={styles.outerCircle} />
                            <Animated.View style={[styles.pulsatingCircle, { transform: [{ scale: pulseAnim }] }]} />
                            <View style={styles.innerCircle} />
                        </View>
                    </Marker>

                    {/* Marcadores animados de vehículos cercanos */}
                    {mockCars.map((car) => (
                        <Marker.Animated
                            key={car.id}
                            coordinate={car.animatedCoordinate}
                            title={car.name}
                        >
                            <View style={{ transform: [{ rotate: `${car.rotation}deg` }] }}>
                                <Image
                                    source={require("../../assets/img/car-2d.png")}
                                    style={styles.carIcon}
                                />
                            </View>
                        </Marker.Animated>
                    ))}
                </MapView>
            ) : (
                <LoadingView />
            )}

            {/* Controles del mapa */}
            <MapControls
                onCenterPress={centerOnUser}
                onZoomInPress={zoomIn}
                onZoomOutPress={zoomOut}
                onCompassPress={resetMapHeading}
            />

            {/* Barra de búsqueda */}
            <SearchBar />

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
const SearchBar = () => (
    <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={COLORS.GRAY} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="¿A dónde vas?"
                placeholderTextColor={COLORS.GRAY}
            />
        </View>
    </View>
);

/**
 * Componente para los controles del mapa
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onCenterPress - Función para centrar el mapa
 * @param {Function} props.onZoomInPress - Función para hacer zoom in
 * @param {Function} props.onZoomOutPress - Función para hacer zoom out
 * @param {Function} props.onCompassPress - Función para resetear la orientación
 * @returns {JSX.Element} Componente MapControls
 */
const MapControls = ({ onCenterPress, onZoomInPress, onZoomOutPress, onCompassPress }) => (
    <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapControlButton} onPress={onCenterPress}>
            <Ionicons name="locate" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton} onPress={onZoomInPress}>
            <Ionicons name="add" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton} onPress={onZoomOutPress}>
            <Ionicons name="remove" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapControlButton} onPress={onCompassPress}>
            <Ionicons name="compass" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
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
        paddingVertical: 10,
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
    },
    mapControls: {
        position: "absolute",
        right: 20,
        top: 150,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        padding: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    mapControlButton: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    outerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(26, 115, 232, 0.2)",
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
    carIcon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        backgroundColor: "transparent"
    },
});

export default HomeScreen;

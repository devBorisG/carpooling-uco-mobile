/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Platform, Dimensions, Modal } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

// Componentes
import Footer from "../components/layout/Footer";

// Hooks y servicios
import { useUserLocation, useMapControls, createAnimatedCoordinate } from "../utils/mapHooks";

// Constantes
import { COLORS, SCREENS, SIZES, TIMES } from "../utils/constants";

/**
 * Pantalla que muestra el viaje en progreso
 * @returns {JSX.Element} Componente RideInProgressScreen
 */
const RideInProgressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedCar, routeCoordinates: initialRouteCoordinates } = route.params;

    const [routeCoordinates, setRouteCoordinates] = useState(initialRouteCoordinates);
    const [progress, setProgress] = useState(0);
    const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(selectedCar.tripInfo.estimatedTime);
    const [distanceCovered, setDistanceCovered] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(routeCoordinates[0]);
    const [showArrivalMessage, setShowArrivalMessage] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);

    const mapRef = useRef(null);
    // Crear una referencia para la animación de la posición del carro
    const carPositionAnimation = useRef(new Animated.ValueXY({
        x: routeCoordinates[0].longitude,
        y: routeCoordinates[0].latitude,
    })).current;

    // Crear una coordenada animada a partir de los valores X e Y
    const carPositionRef = useRef({
        coordinate: createAnimatedCoordinate(
            routeCoordinates[0].latitude,
            routeCoordinates[0].longitude
        )
    }).current;

    // Hooks personalizados
    const { region } = useUserLocation();
    const { centerOnUser, zoomIn, zoomOut } = useMapControls(mapRef, region);

    // Sincronizar la posición animada con los valores de animación
    useEffect(() => {
        const updateCoordinate = carPositionAnimation.addListener(({ x, y }) => {
            carPositionRef.coordinate.timing({
                latitude: y,
                longitude: x,
                duration: 0,
                useNativeDriver: false
            }).start();
        });

        return () => {
            carPositionAnimation.removeListener(updateCoordinate);
        };
    }, []);

    useEffect(() => {
        // Configurar el mapa para mostrar toda la ruta al inicio
        if (mapRef.current && routeCoordinates.length > 0) {
            setTimeout(() => {
                mapRef.current.fitToCoordinates(routeCoordinates, {
                    edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
                    animated: true
                });
            }, 500);
        }

        // Simular el progreso del viaje
        const totalPoints = routeCoordinates.length - 1;
        let currentPoint = 0;
        const totalDistance = selectedCar.tripInfo.distance;
        const totalTime = selectedCar.tripInfo.estimatedTime * 60; // En segundos

        // Aceleramos la simulación para fines de demostración
        const simulationSpeed = 5; // Velocidad x5 para que se mueva más rápido
        const interval = (totalTime * 1000) / (totalPoints * simulationSpeed);

        const animateToNextPoint = () => {
            if (currentPoint < totalPoints) {
                currentPoint++;

                // Obtener próxima posición
                const nextPosition = routeCoordinates[currentPoint];

                // Animar a la siguiente posición
                Animated.timing(carPositionAnimation, {
                    toValue: {
                        x: nextPosition.longitude,
                        y: nextPosition.latitude
                    },
                    duration: interval,
                    useNativeDriver: false
                }).start(() => {
                    // Cuando termina la animación, llamamos al siguiente punto
                    animateToNextPoint();
                });

                setCurrentPosition(nextPosition);

                // Calcular rotación (dirección)
                const prevPoint = routeCoordinates[currentPoint - 1];
                const heading = calculateHeading(prevPoint, nextPosition);

                // Actualizar progreso
                const newProgress = currentPoint / totalPoints;
                setProgress(newProgress);

                // Actualizar distancia recorrida
                const distanceIncrement = totalDistance / totalPoints;
                setDistanceCovered(prev => {
                    const newValue = prev + distanceIncrement;
                    return parseFloat(newValue.toFixed(1));
                });

                // Actualizar tiempo restante
                const timeDecrement = selectedCar.tripInfo.estimatedTime / totalPoints;
                setEstimatedTimeLeft(prev => {
                    const newValue = prev - timeDecrement;
                    return Math.max(0, parseFloat(newValue.toFixed(1)));
                });

                // Si llegamos al destino
                if (currentPoint === totalPoints) {
                    setShowArrivalMessage(true);
                }

                // Centrar mapa en la posición actual del carro
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: nextPosition.latitude,
                        longitude: nextPosition.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }, 1000);
                }
            }
        };

        // Iniciar la animación
        animateToNextPoint();

        return () => {
            // Limpiar animaciones pendientes
            carPositionAnimation.stopAnimation();
        };
    }, []);

    // Calcular ángulo de dirección entre dos puntos
    const calculateHeading = (point1, point2) => {
        const dx = point2.longitude - point1.longitude;
        const dy = point2.latitude - point1.latitude;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    };

    // Manejar finalización del viaje
    const handleFinishRide = () => {
        setShowRatingModal(true);
    };

    // Manejar cancelación del viaje
    const handleCancelRide = () => {
        if (progress > 0.5) {
            Toast.show({
                type: 'warn',
                text1: 'No se puede cancelar',
                text2: 'El viaje está más de la mitad completado',
                position: 'top',
                visibilityTime: TIMES.TOAST_DURATION,
            });
            return;
        }
        navigation.navigate(SCREENS.HOME);
    };

    // Manejar calificación del conductor
    const handleRateDriver = (selectedRating) => {
        setRating(selectedRating);
    };

    // Finalizar el proceso de calificación y volver al inicio
    const handleSubmitRating = () => {
        // Aquí se podría implementar la lógica para guardar la calificación
        Toast.show({
            type: 'success',
            text1: '¡Gracias por tu calificación! \u2B50',
            text2: `Has calificado a ${selectedCar.name} con ${rating} estrellas`,
            position: 'top',
            visibilityTime: TIMES.TOAST_DURATION,
        });
        setShowRatingModal(false);
        navigation.navigate(SCREENS.HOME);
    };

    if (!region) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="car" size={50} color={COLORS.PRIMARY} />
                <Text style={styles.loadingText}>Preparando tu viaje...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                showsUserLocation={false}
                showsCompass={false}
                showsMyLocationButton={false}
                showsTraffic={true}
                showsBuildings={true}
            >
                {/* Ruta completa */}
                <Polyline
                    coordinates={routeCoordinates}
                    strokeWidth={4}
                    strokeColor="#CCCCCC"
                    lineDashPattern={[0]}
                />

                {/* Ruta recorrida */}
                {progress > 0 && (
                    <Polyline
                        coordinates={routeCoordinates.slice(0, Math.floor(routeCoordinates.length * progress) + 1)}
                        strokeWidth={4}
                        strokeColor={COLORS.PRIMARY}
                        lineDashPattern={[0]}
                    />
                )}

                {/* Marcador del carro en movimiento */}
                <Marker.Animated
                    coordinate={carPositionRef.coordinate}
                    title={selectedCar.name}
                >
                    <VehicleMarker rotation={calculateHeading(
                        routeCoordinates[Math.max(0, Math.floor(routeCoordinates.length * progress) - 1)],
                        routeCoordinates[Math.min(routeCoordinates.length - 1, Math.floor(routeCoordinates.length * progress))]
                    )} />
                </Marker.Animated>

                {/* Destino */}
                <Marker
                    coordinate={routeCoordinates[routeCoordinates.length - 1]}
                    title={`Destino: ${selectedCar.destination.name}`}
                >
                    <View style={styles.destinationMarker}>
                        <Ionicons name="location" size={30} color={COLORS.PRIMARY} />
                    </View>
                </Marker>
            </MapView>

            {/* Controles del mapa */}
            <View style={styles.mapControlsContainer}>
                <TouchableOpacity style={styles.mapControlButton} onPress={centerOnUser}>
                    <Ionicons name="navigate" size={24} color={COLORS.PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapControlButton} onPress={zoomIn}>
                    <Ionicons name="add" size={24} color={COLORS.PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapControlButton} onPress={zoomOut}>
                    <Ionicons name="remove" size={24} color={COLORS.PRIMARY} />
                </TouchableOpacity>
            </View>

            {/* Barra de estado del viaje */}
            <View style={styles.rideStatusContainer}>
                <View style={styles.rideStatusHeader}>
                    <View style={styles.driverInfoContainer}>
                        <View style={styles.driverAvatar}>
                            <Text style={styles.driverInitial}>{selectedCar.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.driverDetails}>
                            <Text style={styles.driverName}>{selectedCar.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.ratingText}>4.8</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Barra de progreso */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress * 100)}% completado</Text>
                </View>

                {/* Detalles del viaje */}
                <View style={styles.tripDetailsContainer}>
                    <View style={styles.tripDetail}>
                        <Ionicons name="time-outline" size={20} color={COLORS.PRIMARY} />
                        <Text style={styles.tripDetailText}>{estimatedTimeLeft} min restantes</Text>
                    </View>
                    <View style={styles.tripDetail}>
                        <Ionicons name="navigate-outline" size={20} color={COLORS.PRIMARY} />
                        <Text style={styles.tripDetailText}>{distanceCovered.toFixed(1)} / {selectedCar.tripInfo.distance} km</Text>
                    </View>
                    <View style={styles.tripDetail}>
                        <Ionicons name="location-outline" size={20} color={COLORS.PRIMARY} />
                        <Text style={styles.tripDetailText}>Destino: {selectedCar.destination.name}</Text>
                    </View>
                </View>

                {/* Botones de acción */}
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.cancelButton, progress > 0.5 && styles.disabledButton]}
                        onPress={handleCancelRide}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    {showArrivalMessage ? (
                        <TouchableOpacity style={[styles.actionButton, styles.finishButton]} onPress={handleFinishRide}>
                            <Text style={styles.finishButtonText}>¡Llegaste! Finalizar</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.actionButton, styles.inProgressButton]}>
                            <Text style={styles.inProgressButtonText}>En camino...</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Modal para calificar al conductor */}
            <Modal
                visible={showRatingModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowRatingModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.ratingModalContainer}>
                        <View style={styles.ratingModalHeader}>
                            <Text style={styles.ratingModalTitle}>Califica tu viaje</Text>
                            <Text style={styles.ratingModalSubtitle}>¿Qué te pareció tu viaje con {selectedCar.name}?</Text>
                        </View>

                        <View style={styles.driverProfileContainer}>
                            <View style={styles.driverModalAvatar}>
                                <Text style={styles.driverModalInitial}>{selectedCar.name.charAt(0)}</Text>
                            </View>
                            <Text style={styles.driverModalName}>{selectedCar.name}</Text>
                        </View>

                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleRateDriver(star)}
                                    style={styles.starButton}
                                >
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={40}
                                        color={star <= rating ? "#FFD700" : COLORS.GRAY}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.ratingDescription}>
                            <Text style={styles.ratingDescriptionText}>
                                {rating === 1 ? "Malo" :
                                    rating === 2 ? "Regular" :
                                        rating === 3 ? "Bueno" :
                                            rating === 4 ? "Muy bueno" :
                                                rating === 5 ? "Excelente" : ""}
                            </Text>
                        </View>

                        <View style={styles.ratingButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.ratingButton, styles.cancelRatingButton]}
                                onPress={() => {
                                    setShowRatingModal(false);
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Calificación cancelada',
                                        position: 'top',
                                        visibilityTime: TIMES.TOAST_DURATION,
                                    });
                                }}
                            >
                                <Text style={styles.cancelRatingText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.ratingButton, styles.submitRatingButton, !rating && styles.disabledButton]}
                                onPress={handleSubmitRating}
                                disabled={!rating}
                            >
                                <Text style={styles.submitRatingText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Footer */}
            <Footer
                onHomePress={() => navigation.navigate(SCREENS.HOME)}
            />
        </View>
    );
};

/**
 * Componente para el marcador de vehículo
 * @param {Object} props - Propiedades del componente
 * @returns {JSX.Element} Componente VehicleMarker
 */
const VehicleMarker = ({ rotation }) => (
    <View style={styles.vehicleMarkerContainer}>
        <View style={{ transform: [{ rotate: `${rotation}deg` }] }}>
            <Image
                source={require('../../assets/img/car-2d.png')}
                style={styles.carIcon}
            />
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
    mapControlsContainer: {
        position: "absolute",
        right: 20,
        top: Platform.OS === 'ios' ? 150 : 120,
        zIndex: 1,
    },
    mapControlButton: {
        backgroundColor: COLORS.WHITE,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    rideStatusContainer: {
        position: 'absolute',
        bottom: 90,
        left: 20,
        right: 20,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 20,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    rideStatusHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
    },
    driverInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    driverAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverInitial: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    driverDetails: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.BLACK,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        color: COLORS.GRAY,
        fontWeight: '600',
    },
    progressBarContainer: {
        marginBottom: 15,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 5,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: COLORS.GRAY,
        textAlign: 'right',
    },
    tripDetailsContainer: {
        marginBottom: 15,
    },
    tripDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tripDetailText: {
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.BLACK,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cancelButton: {
        backgroundColor: COLORS.CANCEL_BUTTON,
        marginRight: 10,
    },
    disabledButton: {
        opacity: 0.5,
    },
    cancelButtonText: {
        color: COLORS.CANCEL_BUTTON_TEXT,
        fontSize: SIZES.FONT_MEDIUM,
        fontWeight: 'bold',
    },
    finishButton: {
        backgroundColor: COLORS.PRIMARY,
    },
    finishButtonText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inProgressButton: {
        backgroundColor: COLORS.LIGHT_GRAY,
    },
    inProgressButtonText: {
        color: COLORS.GRAY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    destinationMarker: {
        alignItems: 'center',
    },
    vehicleMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    carIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    // Estilos para el modal de calificación
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingModalContainer: {
        width: '85%',
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    ratingModalHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingModalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        marginBottom: 8,
    },
    ratingModalSubtitle: {
        fontSize: 16,
        color: COLORS.GRAY,
        textAlign: 'center',
    },
    driverProfileContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    driverModalAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    driverModalInitial: {
        color: COLORS.WHITE,
        fontSize: 28,
        fontWeight: 'bold',
    },
    driverModalName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.BLACK,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    starButton: {
        padding: 5,
    },
    ratingDescription: {
        marginBottom: 25,
        height: 20,
    },
    ratingDescriptionText: {
        fontSize: 16,
        color: COLORS.GRAY,
        fontWeight: 'bold',
    },
    ratingButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    ratingButton: {
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    cancelRatingButton: {
        backgroundColor: COLORS.BACKGROUND,
        marginRight: 10,
    },
    cancelRatingText: {
        color: COLORS.GRAY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitRatingButton: {
        backgroundColor: COLORS.PRIMARY,
    },
    submitRatingText: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RideInProgressScreen; 
/* eslint-disable prettier/prettier */
import { useRef, useState, useEffect } from 'react';
import { Platform, Animated } from 'react-native';
import { AnimatedRegion } from 'react-native-maps';
import { getUserLocation } from './locationService';

/**
 * Hook para controlar el mapa
 * @param {Object} mapRef - Referencia al componente MapView
 * @param {Object} region - Región actual del mapa
 * @returns {Object} Objeto con funciones para controlar el mapa
 */
export const useMapControls = (mapRef, region) => {
    const resetMapHeading = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera({ heading: 0 }, { duration: 500 });
        }
    };

    const centerOnUser = () => {
        if (mapRef.current && region) {
            mapRef.current.animateCamera({ center: region }, { duration: 500 });
        }
    };

    const zoomIn = async () => {
        if (mapRef.current) {
            try {
                const camera = await mapRef.current.getCamera();
                if (!camera?.center?.latitude || !camera?.center?.longitude || isNaN(camera?.center?.latitude) || isNaN(camera?.center?.longitude)) {
                    console.error("Cámara no válida:", camera);
                    return;
                }

                let newLatitudeDelta;
                if (Platform.OS === "ios") {
                    newLatitudeDelta = Math.max((camera.altitude || 0) / 20000, 0.002);
                } else {
                    newLatitudeDelta = Math.max(region.latitudeDelta / 1.5, 0.002);
                }
                const newLongitudeDelta = newLatitudeDelta;

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: newLatitudeDelta,
                    longitudeDelta: newLongitudeDelta,
                }, 500);
            } catch (error) {
                console.error("Error al obtener la cámara:", error);
            }
        }
    };

    const zoomOut = async () => {
        if (mapRef.current) {
            try {
                const camera = await mapRef.current.getCamera();
                if (!camera?.center?.latitude || !camera?.center?.longitude || isNaN(camera?.center?.latitude) || isNaN(camera?.center?.longitude)) {
                    console.error("Cámara no válida:", camera);
                    return;
                }

                let newLatitudeDelta;
                if (Platform.OS === "ios") {
                    newLatitudeDelta = Math.min((camera.altitude || 0) / 5000, 1);
                } else {
                    newLatitudeDelta = Math.min(region.latitudeDelta * 1.5, 1);
                }
                const newLongitudeDelta = newLatitudeDelta;

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: newLatitudeDelta,
                    longitudeDelta: newLongitudeDelta,
                }, 500);
            } catch (error) {
                console.error("Error al obtener la cámara:", error);
            }
        }
    };

    return {
        resetMapHeading,
        centerOnUser,
        zoomIn,
        zoomOut
    };
};

/**
 * Hook para manejar la ubicación del usuario
 * @returns {Object} Objeto con la región y estado de carga
 */
export const useUserLocation = () => {
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocation = async () => {
            try {
                setLoading(true);
                const location = await getUserLocation();
                if (location) {
                    setRegion({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            } catch (error) {
                console.error("Error al cargar la ubicación:", error);
            } finally {
                setLoading(false);
            }
        };

        loadLocation();
    }, []);

    return { region, setRegion, loading };
};

/**
 * Crea una coordenada animada para el mapa
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {AnimatedRegion} Coordenada animada
 */
export const createAnimatedCoordinate = (latitude, longitude) => {
    return new AnimatedRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
};

/**
 * Hook para la animación de pulso
 * @returns {Animated.Value} Valor animado
 */
export const usePulseAnimation = () => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1200,
                    useNativeDriver: false,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return pulseAnim;
};
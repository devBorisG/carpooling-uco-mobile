/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Guarda la ubicación del usuario en AsyncStorage
 * @param {Object} location - Objeto con la ubicación del usuario
 * @param {number} location.latitude - Latitud
 * @param {number} location.longitude - Longitud
 * @returns {Promise<void>}
 */
export const saveUserLocation = async (location) => {
    try {
        await AsyncStorage.setItem("userLocation", JSON.stringify(location));
    } catch (error) {
        console.error("Error al guardar la ubicación:", error);
        throw error;
    }
};

/**
 * Obtiene la ubicación del usuario desde AsyncStorage
 * @returns {Promise<Object|null>} Objeto con la ubicación del usuario o null si no existe
 */
export const getUserLocation = async () => {
    try {
        const storedLocation = await AsyncStorage.getItem("userLocation");
        return storedLocation ? JSON.parse(storedLocation) : null;
    } catch (error) {
        console.error("Error al cargar la ubicación:", error);
        return null;
    }
};

/**
 * Crea un objeto de región para el mapa
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @param {number} latitudeDelta - Delta de latitud
 * @param {number} longitudeDelta - Delta de longitud
 * @returns {Object} Objeto de región para el mapa
 */
export const createRegion = (
    latitude,
    longitude,
    latitudeDelta = 0.0922,
    longitudeDelta = 0.0421
) => ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
}); 
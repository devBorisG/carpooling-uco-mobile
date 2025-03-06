/* eslint-disable prettier/prettier */
import * as Font from "expo-font";

/**
 * Carga las fuentes necesarias para la aplicación
 * @returns {Promise<boolean>} true si las fuentes se cargaron correctamente, false en caso contrario
 */
export const loadFonts = async () => {
    try {
        await Font.loadAsync({
            "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
            "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
            "montserrat-semibold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        });
        return true;
    } catch (error) {
        console.error("Error cargando fuentes:", error);
        return false;
    }
};

/**
 * Espera un tiempo determinado (útil para la pantalla de splash)
 * @param {number} ms - Tiempo en milisegundos
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 
/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

/**
 * Simula un inicio de sesión
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise<boolean>} true si el inicio de sesión fue exitoso, false en caso contrario
 */
export const login = async (email, password) => {
    try {
        // Aquí iría la lógica de autenticación real con un backend
        // Por ahora, simulamos un inicio de sesión exitoso
        const user = {
            email,
            name: "Usuario",
            role: "user",
        };

        await AsyncStorage.setItem("user", JSON.stringify(user));

        Toast.show({
            type: 'success',
            text1: '¡Inicio de sesión exitoso! \uD83D\uDE0A',
            position: 'top',
            visibilityTime: 2000,
        });

        return true;
    } catch (error) {
        console.error("Error en inicio de sesión:", error);

        Toast.show({
            type: 'error',
            text1: 'Error en inicio de sesión',
            text2: error.message || 'Intenta nuevamente',
            position: 'top',
            visibilityTime: 3000,
        });

        return false;
    }
};

/**
 * Simula un registro de usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Promise<boolean>} true si el registro fue exitoso, false en caso contrario
 */
export const register = async (userData) => {
    try {
        // Aquí iría la lógica de registro real con un backend
        // Por ahora, simulamos un registro exitoso
        const user = {
            email: userData.email,
            name: userData.name,
            role: userData.role || "user",
        };

        await AsyncStorage.setItem("user", JSON.stringify(user));

        Toast.show({
            type: 'success',
            text1: '¡Registro exitoso! \uD83D\uDE0A',
            position: 'top',
            visibilityTime: 2000,
        });

        return true;
    } catch (error) {
        console.error("Error en registro:", error);

        Toast.show({
            type: 'error',
            text1: 'Error en registro',
            text2: error.message || 'Intenta nuevamente',
            position: 'top',
            visibilityTime: 3000,
        });

        return false;
    }
};

/**
 * Cierra la sesión del usuario
 * @returns {Promise<boolean>} true si el cierre de sesión fue exitoso, false en caso contrario
 */
export const logout = async () => {
    try {
        await AsyncStorage.removeItem("user");
        return true;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return false;
    }
};

/**
 * Obtiene el usuario actual
 * @returns {Promise<Object|null>} Objeto con los datos del usuario o null si no hay sesión
 */
export const getCurrentUser = async () => {
    try {
        const user = await AsyncStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
}; 
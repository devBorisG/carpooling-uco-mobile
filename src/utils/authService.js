/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

/**
 * Simula un inicio de sesión
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Objeto con la información del inicio de sesión
 */
export const login = async (email, password) => {
    try {
        // Datos mockeados de ejemplo
        const mockUsers = {
            "jarod@gmail.com": {
                password: "123456",
                role: "driver",
                name: "Jarodsito",
                profileImage: require("../../assets/img/jarodsito.png"),
                carInfo: {
                    model: "Toyota Corolla",
                    plate: "ACH777",
                    color: "Negro"
                }
            },
            "pasajero@gmail.com": {
                password: "123456",
                role: "passenger",
                name: "María Beserra",
                profileImage: require("../../assets/img/rolPasajero.jpg")
            }
        };

        // Verificar si el usuario existe y la contraseña es correcta
        const userData = mockUsers[email];
        if (!userData || userData.password !== password) {
            Toast.show({
                type: 'error',
                text1: 'Error de autenticación',
                text2: 'Correo o contraseña incorrectos',
                position: 'top',
                visibilityTime: 3000,
            });
            return { success: false, role: null };
        }

        const user = {
            email,
            name: userData.name,
            role: userData.role,
            profileImage: userData.profileImage,
            ...(userData.carInfo && { carInfo: userData.carInfo })
        };

        await AsyncStorage.setItem("user", JSON.stringify(user));

        Toast.show({
            type: 'success',
            text1: '¡Inicio de sesión exitoso! \uD83D\uDE0A',
            position: 'top',
            visibilityTime: 2000,
        });

        return { success: true, role: userData.role };
    } catch (error) {
        console.error("Error en inicio de sesión:", error);

        Toast.show({
            type: 'error',
            text1: 'Error en inicio de sesión',
            text2: error.message || 'Intenta nuevamente',
            position: 'top',
            visibilityTime: 3000,
        });

        return { success: false, role: null };
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

/**
 * Obtiene el email del usuario actual
 * @returns {Promise<string|null>} Email del usuario o null si no hay sesión
 */
export const getCurrentUserEmail = async () => {
    try {
        const user = await getCurrentUser();
        return user ? user.email : null;
    } catch (error) {
        console.error("Error al obtener el email del usuario:", error);
        return null;
    }
}; 
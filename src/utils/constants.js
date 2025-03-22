/* eslint-disable prettier/prettier */

// Colores de la aplicación
export const COLORS = {
    PRIMARY: "#00473B",
    SECONDARY: "#308A5A",
    BACKGROUND: "#E2FEEF",
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GRAY: "#777777",
    LIGHT_GRAY: "#CCCCCC",
    ERROR: "#FF3B30",
    SUCCESS: "#4CD964",
    LINK: "#4A73DA",
};

// Tiempos
export const TIMES = {
    SPLASH_DURATION: 3000, // 3 segundos
    TOAST_DURATION: 2000, // 2 segundos
    ANIMATION_DURATION: 300, // 300 milisegundos
};

// Tamaños
export const SIZES = {
    FONT_SMALL: 14,
    FONT_MEDIUM: 16,
    FONT_LARGE: 18,
    FONT_XLARGE: 24,
    FONT_XXLARGE: 40,
    FONT_TITLE: 58,
    PADDING_SMALL: 5,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 20,
    BORDER_RADIUS: 10,
};

// Nombres de fuentes
export const FONTS = {
    REGULAR: "montserrat-regular",
    SEMIBOLD: "montserrat-semibold",
    BOLD: "montserrat-bold",
};

// Nombres de pantallas
export const SCREENS = {
    SPLASH: "SplashScreen",
    LOGIN: "LoginScreen",
    SIGNUP: "SignUpScreen",
    HOME: "HomeScreen",
    ONBOARDING: "OnboardingScreen",
    FORGOT_PASSWORD: "ForgotPasswordScreen",
    VERIFICATION: "VerificationScreen",
    TERMS: "TermsScreen",
    PRIVACY: "PrivacyScreen",
    SELECT_ROLE: "SelectRoleScreen",
    CREATE_CAR: "CreateCarScreen",
    CREATE_ROUTE: "CreateRouteScreen",
    BOOKING: "BookingScreen",
    ALLOW_LOCATION: "AllowLocationScreen",
    RIDE_IN_PROGRESS: "RideInProgressScreen",
};

// Datos mock para el desarrollo
export const MOCK_DATA = {
    DRIVER_NAMES: [
        "Jarod", "Jarod Sapo", "Rafa", "Felipito", "Morronga",
        "Pepito", "Rafael", "Boris", "Luis", "Carlos"
    ],
    DESTINATIONS: [
        "Universidad de Córdoba", "Centro Comercial", "Parque Lineal",
        "Terminal de Transporte", "Aeropuerto", "Hospital San Jerónimo",
        "Estadio", "Ronda del Sinú", "Mercado Central", "Biblioteca Pública"
    ]
};

// Opciones del menú lateral
export const SIDEBAR_OPTIONS = [
    "Perfil",
    "Historial de viajes",
    "Sobre",
    "Ayuda",
    "Cerrar sesión",
];
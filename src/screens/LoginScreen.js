/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { login } from "../utils/authService";
import { COLORS, FONTS, SCREENS, SIZES } from "../utils/constants";

// Componentes
import BackButton from "../components/common/BackButton";
import ValidatedInput from "../components/common/ValidatedInput";
import Button from "../components/common/Button";

// Iconos
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import GoogleIcon from "../../assets/img/google-icon.svg";

const loginIcon = require("../../assets/img/Login.jpg");

/**
 * Pantalla de inicio de sesión
 * @returns {JSX.Element} Componente LoginScreen
 */
const LoginScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [isValid, setIsValid] = useState(false);

    // Actualiza el estado del formulario
    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        
        // Limpia el error al cambiar el valor
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    // Valida el correo electrónico
    const validateEmail = () => {
        if (!isValidEmail(formData.email)) {
            setErrors(prev => ({
                ...prev,
                email: "Ingresa un correo válido",
            }));
            return false;
        }
        return true;
    };

    // Valida la contraseña
    const validatePassword = () => {
        if (!isValidPassword(formData.password)) {
            setErrors(prev => ({
                ...prev,
                password: "La contraseña debe tener al menos 6 caracteres",
            }));
            return false;
        }
        return true;
    };

    // Actualiza el estado de validez del formulario
    useEffect(() => {
        const isFormValid = 
            formData.email && 
            formData.password && 
            !errors.email && 
            !errors.password;
            
        setIsValid(isFormValid);
    }, [formData, errors]);

    // Maneja el inicio de sesión
    const handleLogin = async () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            const success = await login(formData.email, formData.password);
            if (success) {
                navigation.navigate(SCREENS.HOME);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <BackButton />
                <Image source={loginIcon} style={styles.image} />
                <Text style={styles.title}>Ingresar</Text>

                <View style={styles.svgContainer}>
                    <Svg height="10" width="230">
                        <Line 
                            x1="0" 
                            y1="0" 
                            x2="80" 
                            y2="0" 
                            stroke={COLORS.PRIMARY} 
                            strokeWidth="9" 
                            strokeOpacity={0.7} 
                            strokeLinecap="round" 
                        />
                    </Svg>
                </View>

                <View style={styles.formContainer}>
                    <ValidatedInput
                        label="Correo electrónico*"
                        icon={<Feather name="mail" size={25} color={COLORS.GRAY} />}
                        placeholder="Ingresar correo"
                        value={formData.email}
                        onChangeText={(text) => updateFormData("email", text)}
                        onBlur={validateEmail}
                        errorMsg={errors.email}
                    />
                    <ValidatedInput
                        label="Contraseña*"
                        icon={<Feather name="lock" size={25} color={COLORS.GRAY} />}
                        placeholder="Ingresar contraseña"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) => updateFormData("password", text)}
                        onBlur={validatePassword}
                        errorMsg={errors.password}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.FORGOT_PASSWORD)}>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>

                <Button 
                    title="Ingresar" 
                    onPress={handleLogin} 
                    buttonStyle={{ width: "100%" }} 
                    icon={<Entypo name="login" size={20} color={COLORS.WHITE} />} 
                    disabled={!isValid}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>o</Text>
                    <View style={styles.divider} />
                </View>

                <Button
                    title="Ingresar con Google"
                    onPress={() => console.log("Login con Google")}
                    variant="secondary"
                    buttonStyle={{ width: "100%" }}
                    textStyle={styles.googleButtonText}
                    icon={<GoogleIcon width={24} height={24} />}
                />

                <Text style={styles.registerText}>
                    ¿Eres nuevo? <Text style={styles.link} onPress={() => navigation.navigate(SCREENS.SIGNUP)}>Registrate ahora</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.WHITE,
        alignItems: "center",
        paddingHorizontal: SIZES.PADDING_LARGE,
        paddingTop: 50,
        paddingBottom: 40,
    },
    image: {
        width: 280,
        height: 280,
    },
    title: {
        fontSize: SIZES.FONT_XXLARGE,
        fontFamily: FONTS.BOLD,
        alignSelf: "flex-start",
        color: COLORS.SECONDARY,
    },
    svgContainer: {
        marginBottom: SIZES.PADDING_LARGE,
    },
    formContainer: {
        width: "100%",
        marginBottom: SIZES.PADDING_LARGE,
    },
    forgotPassword: {
        fontSize: SIZES.FONT_SMALL,
        color: COLORS.LINK,
        textDecorationLine: "underline",
        fontFamily: FONTS.BOLD,
        alignSelf: "flex-end",
        marginTop: SIZES.PADDING_SMALL,
        marginRight: SIZES.PADDING_MEDIUM,
    },
    registerText: {
        fontSize: SIZES.FONT_SMALL,
        textAlign: "center",
        marginTop: 15,
        fontFamily: FONTS.SEMIBOLD,
    },
    link: {
        textDecorationLine: "underline",
        color: COLORS.LINK,
        fontFamily: FONTS.BOLD,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: SIZES.PADDING_MEDIUM,
        paddingBottom: SIZES.PADDING_MEDIUM,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.LIGHT_GRAY,
    },
    dividerText: {
        marginHorizontal: SIZES.PADDING_MEDIUM,
        fontSize: SIZES.FONT_MEDIUM,
        color: COLORS.GRAY,
    },
});

export default LoginScreen;
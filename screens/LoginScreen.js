/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail, isValidPassword } from "../utils/validation";
import BackButton from "../components/BackButton";
import ValidatedInput from "../components/ValidatedInput";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import Entypo from "@expo/vector-icons/Entypo";
import GoogleIcon from "../assets/img/google-icon.svg";
import Toast from 'react-native-toast-message';

const loginIcon = require("../assets/img/Login.jpg");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [correoErrorMsg, setCorreoErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [isValid, setIsValid] = useState(false);

    const validateEmail = () => {
        if (!isValidEmail(correo)) {
            setCorreoErrorMsg("Ingresa un correo válido");
        } else {
            setCorreoErrorMsg("");
        }
    };

    const validatePassword = () => {
        if (!isValidPassword(password)) {
            setPasswordErrorMsg("La contraseña debe tener al menos 6 caracteres");
        } else {
            setPasswordErrorMsg("");
        }
    };

    useEffect(() => {
        if (correoErrorMsg === "" && passwordErrorMsg === "" && correo && password) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [correoErrorMsg, passwordErrorMsg, correo, password]);

    const handleLogin = () => {
        validateEmail();
        validatePassword();
        if (isValid) {
            Toast.show({
                type: 'success',
                text1: '¡Inicio de sesión exitoso! \uD83D\uDE0A',
                position: 'top',
                visibilityTime: 2000,
            });
            navigation.navigate("HomeScreen");
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
                        <Line x1="0" y1="0" x2="80" y2="0" stroke="#00473B" strokeWidth="9" strokeOpacity={0.7} strokeLinecap="round" />
                    </Svg>
                </View>

                <View style={styles.formContainer}>
                    <ValidatedInput
                        label="Correo electrónico*"
                        icon={<Feather name="mail" size={25} color="#777" />}
                        placeholder="Ingresar correo"
                        value={correo}
                        onChangeText={(text) => {
                            setCorreo(text);
                            setCorreoErrorMsg("");
                        }}
                        onBlur={validateEmail}
                        errorMsg={correoErrorMsg}
                    />
                    <ValidatedInput
                        label="Contraseña*"
                        icon={<Feather name="lock" size={25} color="#777" />}
                        placeholder="Ingresar contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordErrorMsg("");
                        }}
                        onBlur={validatePassword}
                        errorMsg={passwordErrorMsg}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>

                <Button title="Ingresar" onPress={handleLogin} buttonStyle={{ width: "100%" }} icon={<Entypo name="login" size={20} color="#fff" />} />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>o</Text>
                    <View style={styles.divider} />
                </View>

                <Button
                    title="Ingresar con Google"
                    onPress={() => console.log("Login con Google")}
                    variant="secondary" // Para el fondo blanco
                    buttonStyle={{ width: "100%" }}
                    textStyle={styles.googleButtonText}
                    icon={<GoogleIcon width={24} height={24} />}
                />

                <Text style={styles.registerText}>
                    ¿Eres nuevo? <Text style={styles.link} onPress={() => navigation.navigate("SignUpScreen")}>Registrate ahora</Text>
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
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 40,
    },
    image: {
        width: 280,
        height: 280,
    },
    title: {
        fontSize: 40,
        fontFamily: "montserrat-bold",
        alignSelf: "flex-start",
        color: "#005C53",
    },
    svgContainer: {
        marginBottom: 20,
    },
    formContainer: {
        width: "100%",
        marginBottom: 20,
    },
    forgotPassword: {
        fontSize: 14,
        color: "#4A73DA",
        textDecorationLine: "underline",
        fontFamily: "montserrat-bold",
        alignSelf: "flex-end",
        marginTop: 5,
        marginRight: 10,
    },
    registerText: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 15,
        fontFamily: "montserrat-semibold",
    },
    link: {
        textDecorationLine: "underline",
        color: "#4A73DA",
        fontFamily: "montserrat-bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 10,
        paddingBottom: 10,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#CCC",
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: "#777",
    },
});

export default LoginScreen;
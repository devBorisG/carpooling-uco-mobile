/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const loginIcon = require("../assets/img/Login.jpg");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    // Estados para manejar los errores de validación
    const [correoErrorMsg, setCorreoErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    // Validación al perder el foco de cada campo
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            setCorreoErrorMsg("Ingresa un correo válido");
        } else {
            setCorreoErrorMsg("");
        }
    };

    const validatePassword = () => {
        if (password.trim().length < 6) {
            setPasswordErrorMsg("La contraseña debe tener al menos 6 caracteres");
        } else {
            setPasswordErrorMsg("");
        }
    };

    // Validación global del formulario al presionar el botón
    const validateForm = () => {
        validateEmail();
        validatePassword();
        return (
            correoErrorMsg === "" &&
            passwordErrorMsg === "" &&
            correo &&
            password
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={45} color="#042940" />
                </TouchableOpacity>
                <Image source={loginIcon} style={styles.image} />
                <Text style={styles.title}>Ingresar</Text>

                {/* Línea horizontal SVG debajo del título */}
                <View style={styles.svgContainer}>
                    <Svg height="10" width="230">
                        <Line
                            x1="0"
                            y1="0"
                            x2="80"
                            y2="0"
                            stroke="#00473B"
                            strokeWidth="9"
                            strokeOpacity={0.7}
                            strokeLinecap="round"
                        />
                    </Svg>
                </View>

                {/* Formulario */}
                <View style={styles.formContainer}>
                    {/* Campo Correo */}
                    <View style={styles.inputContainer}>
                        <Feather name="mail" size={20} color="#BEBEBE" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, correoErrorMsg && { borderColor: "red" }]}
                            placeholder="Ingresar correo*"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={(text) => {
                                setCorreo(text);
                                if (correoErrorMsg) setCorreoErrorMsg("");
                            }}
                            onBlur={validateEmail}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {correoErrorMsg ? <Text style={styles.errorText}>{correoErrorMsg}</Text> : null}

                    {/* Campo Contraseña */}
                    <View style={styles.inputContainer}>
                        <Feather name="lock" size={10} color="#BEBEBE" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, passwordErrorMsg && { borderColor: "red" }]}
                            placeholder="Ingresar contraseña*"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (passwordErrorMsg) setPasswordErrorMsg("");
                            }}
                            onBlur={validatePassword}
                            placeholderTextColor="#999"
                        />
                    </View>
                    {passwordErrorMsg ? <Text style={styles.errorText}>{passwordErrorMsg}</Text> : null}
                </View>

                {/* Botón Ingresar */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (validateForm()) {
                            navigation.navigate("HomeScreen");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                {/* Redirección a Registro */}
                <Text style={styles.termsText}>
                    ¿No tienes cuenta?{" "}
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate("SingUpScreen")}
                    >
                        Registrarse
                    </Text>
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
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 10,
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
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 45,
        fontFamily: "montserrat-regular",
        color: "#000",
        borderBottomWidth: 1,
        borderColor: "#BEBEBE",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginLeft: 45,
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#00473B",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        marginBottom: 20,
        width: "100%",
        alignSelf: "stretch",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "montserrat-bold",
    },
    termsText: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "montserrat-regular",
    },
    link: {
        textDecorationLine: "underline",
        color: "#4A73DA",
        fontFamily: "montserrat-bold",
    },
});

export default LoginScreen;

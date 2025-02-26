/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail, isValidPassword } from "../utils/validation";
import BackButton from "../components/BackButton";
import ValidatedInput from "../components/ValidatedInput";
import Button from "../components/Button";
import Entypo from "@expo/vector-icons/Entypo";

const loginIcon = require("../assets/img/Login.jpg");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const [correoErrorMsg, setCorreoErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

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
                <BackButton />
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
                    <ValidatedInput
                        icon="mail"
                        placeholder="Ingresar correo*"
                        value={correo}
                        onChangeText={(text) => {
                            setCorreo(text);
                            if (correoErrorMsg) setCorreoErrorMsg("");
                        }}
                        onBlur={validateEmail}
                        errorMsg={correoErrorMsg}
                    />
                    <ValidatedInput
                        icon="lock"
                        placeholder="Ingresar contraseña*"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordErrorMsg) setPasswordErrorMsg("");
                        }}
                        onBlur={validatePassword}
                        errorMsg={passwordErrorMsg}
                    />
                </View>

                {/* Botón Ingresar */}
                <Button
                    title="Ingresar"
                    onPress={() => {
                        if (validateForm()) {
                            navigation.navigate("HomeScreen");
                        }
                    }}
                    buttonStyle={{ width: "100%" }}
                    icon={<Entypo name="login" size={20} color="#fff" />}
                />

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

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail, isValidPassword } from "../utils/validation";
import BackButton from "../components/BackButton";
import ValidatedInput from "../components/ValidatedInput";
import Button from "../components/Button";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const loginIcon = require("../assets/img/Login.jpg");

const LoginScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [correoErrorMsg, setCorreoErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const handleLogin = () => {
        validateEmail();
        validatePassword();
        if (correoErrorMsg === "" && passwordErrorMsg === "" && correo && password) {
            setSuccessMessage("Inicio de sesión exitoso");
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
                        icon="mail"
                        placeholder="Ingresar correo"
                        value={correo}
                        onChangeText={(text) => {
                            setCorreo(text);
                            setCorreoErrorMsg("");
                            setSuccessMessage("");
                        }}
                        onBlur={validateEmail}
                        errorMsg={correoErrorMsg}
                    />
                    <ValidatedInput
                        label="Contraseña*"
                        icon="lock"
                        placeholder="Ingresar contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordErrorMsg("");
                            setSuccessMessage("");
                        }}
                        onBlur={validatePassword}
                        errorMsg={passwordErrorMsg}
                    />
                    {successMessage ? <Text style={styles.successMsg}>{successMessage}</Text> : null}
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>

                <Button title="Ingresar" onPress={handleLogin} buttonStyle={{ width: "100%" }} icon={<Entypo name="login" size={20} color="#fff" />} />

                <TouchableOpacity style={styles.googleButton} onPress={() => console.log("Login con Google")}> 
                    <FontAwesome name="google" size={24} color="#EA4335" style={styles.googleIcon} /> 
                    <Text style={styles.googleButtonText}>Continuar con Google</Text> 
                </TouchableOpacity>
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
    forgotPassword: {
        fontSize: 14,
        color: "#4A73DA",
        textDecorationLine: "underline",
        fontFamily: "montserrat-semibold",
        alignSelf: "flex-end",
        marginTop: 5,
        marginRight: 10,
    },
    successMsg: {
        color: "green",
        fontSize: 14,
        marginTop: 5,
        fontFamily: "montserrat-medium",
        textAlign: "center",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        marginTop: 10,
    },
    googleIcon: {
        marginRight: 10,
    },
    googleButtonText: {
        fontSize: 16,
        color: "#333",
        fontFamily: "montserrat-bold",
    },
});

export default LoginScreen;
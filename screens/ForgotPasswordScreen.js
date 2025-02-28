import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ValidatedInput from "../components/ValidatedInput";
import { isValidEmail } from "../utils/validation";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [correoErrorMsg, setCorreoErrorMsg] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSendEmail = () => {
        if (!isValidEmail(correo)) {
            setCorreoErrorMsg("Ingresa un correo válido");
            setSuccessMessage("");
            return;
        }
        setCorreoErrorMsg("");
        setSuccessMessage("Correo enviado con éxito. Verifica tu bandeja de entrada.");
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.subtitle}>
                Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
            </Text>
            <View style={styles.inputContainer}>
                <ValidatedInput
                    label="Correo electrónico*"
                    icon="mail"
                    placeholder="Ingresa tu correo"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={(text) => {
                        setCorreo(text);
                        setCorreoErrorMsg("");
                        setSuccessMessage("");
                    }}
                    onBlur={() => {
                        if (!isValidEmail(correo)) setCorreoErrorMsg("Ingresa un correo válido");
                    }}
                    errorMsg={correoErrorMsg}
                />
            </View>
            {successMessage ? <Text style={styles.successMsg}>{successMessage}</Text> : null}
            <Button title="Enviar correo" onPress={handleSendEmail} buttonStyle={styles.button} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backToLogin}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontFamily: "montserrat-bold",
        color: "#005C53",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "montserrat-medium",
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 10,
    },
    successMsg: {
        color: "green",
        fontSize: 14,
        marginTop: 5,
        fontFamily: "montserrat-medium",
    },
    button: {
        width: "100%",
        marginVertical: 10,
    },
    backToLogin: {
        fontSize: 14,
        color: "#4A73DA",
        textDecorationLine: "underline",
        fontFamily: "montserrat-semibold",
        marginTop: 15,
    },
});

export default ForgotPasswordScreen;
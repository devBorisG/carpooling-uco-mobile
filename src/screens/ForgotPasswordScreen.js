/*eslint-disable*/
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Line } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import ValidatedInput from "../components/common/ValidatedInput";
import { isValidEmail } from "../utils/validation";
import Toast from "react-native-toast-message";
import { COLORS, SCREENS, SIZES} from '../utils/constants';

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
        Toast.show({
            type: "info",
            text1: "Correo enviado \uD83D\uDCE7",
            text2: "Revisa tu bandeja de entrada",
            position: "top",
        });
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Recuperar contraseña</Text>
            <View style={styles.svgContainer}>
                <Svg height="10" width="230">
                    <Line x1="0" y1="0" x2="80" y2="0" stroke="#00473B" strokeWidth="9" strokeOpacity={0.7} strokeLinecap="round" />
                </Svg>
            </View>
            <Text style={styles.subtitle}>
                Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña.
            </Text>
            <View style={styles.inputContainer}>
                <ValidatedInput
                    label="Correo electrónico*"
                    icon={<Feather name="mail" size={25} color="#777" />}
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
            <Button title="Enviar correo"
                onPress={handleSendEmail}
                buttonStyle={styles.button}
                icon={<Feather name="send" size={20} color="#fff" />}
            />
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
        backgroundColor: COLORS.WHITE,
    },
    title: {
        fontSize: 40,
        fontFamily: "montserrat-bold",
        color: COLORS.PRIMARY,
        marginBottom: 8, // Espacio antes de la línea
        lineHeight: 44, // Evita que el texto se vea demasiado separado
        textAlign: "center",
    },
    svgContainer: {
        marginBottom: 16, // Espacio entre la línea y el subtítulo
    },
    subtitle: {
        fontSize: 18,
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
        color: COLORS.SUCCESS,
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
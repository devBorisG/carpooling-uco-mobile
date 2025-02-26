/* eslint-disable prettier/prettier */
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Line } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { v4 as uuidv4 } from 'uuid';

const optIcon = require("../assets/img/VerificationCode.jpg");

const VerificationScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState("");
    const otpInputRef = useRef(null);

    const handleVerify = () => {
        console.log("OTP verificado:", otp);
        navigation.navigate("HomeScreen");
    };

    const handleResend = () => {
        console.log("Código reenviado");
    };

    const handleOTPPress = () => {
        if (otpInputRef.current) {
            otpInputRef.current.focus();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={45} color="#042940" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={optIcon} style={styles.image} />
                <Text style={styles.title}>Verificación</Text>

                {/* Línea horizontal SVG debajo del título */}
                <View style={styles.svgContainer}>
                    <Svg height="10" width="100">
                        <Line
                            x1="0"
                            y1="0"
                            x2="100"
                            y2="0"
                            stroke="#00473B"
                            strokeWidth="9"
                            strokeOpacity={0.7}
                            strokeLinecap="round"
                        />
                    </Svg>
                </View>

                <Text style={styles.subtitle}>
                    Ingresa el código de 4 dígitos que te enviamos a tu número celular
                </Text>

                {/* TextInput oculto para recoger el OTP */}
                <TextInput
                    ref={otpInputRef}
                    style={styles.hiddenInput}
                    keyboardType="number-pad"
                    maxLength={4}
                    value={otp}
                    onChangeText={(text) => {
                        const numericText = text.replace(/\D/g, "");
                        setOtp(numericText);
                    }}
                    autoFocus
                />

                {/* Visualización personalizada del OTP */}
                <TouchableOpacity style={styles.otpContainer} onPress={handleOTPPress} activeOpacity={1}>
                    {[0, 1, 2, 3].map((_, index) => (
                        <View style={styles.otpBox} key={uuidv4()}>
                            <Text style={styles.otpDigit}>{otp[index] || ""}</Text>
                            <View style={styles.underline} />
                        </View>
                    ))}
                </TouchableOpacity>

                {/* Botón Verificar */}
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verificar</Text>
                </TouchableOpacity>

                {/* Botón Reenviar código */}
                <TouchableOpacity style={[styles.button, styles.resendButton]} onPress={handleResend}>
                    <Text style={[styles.buttonText, styles.buttonResendText]}>Reenviar código</Text>
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
        backgroundColor: "#fff",
        padding: 20,
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 10,
    },
    image: {
        width: 280,
        height: 280,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: "montserrat-bold",
        color: "#005C53",
        alignSelf: "flex-start",
    },
    subtitle: {
        fontSize: 18,
        fontFamily: "montserrat-regular",
        color: "#BEBEBE",
        marginBottom: 30,
        alignSelf: "flex-start",
    },
    hiddenInput: {
        position: "absolute",
        opacity: 0,
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 30,
    },
    otpBox: {
        alignItems: "center",
        width: 50,
    },
    otpDigit: {
        fontSize: 32,
        fontFamily: "montserrat-bold",
        color: "#000",
    },
    underline: {
        width: "100%",
        height: 2,
        backgroundColor: "#BEBEBE",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#00473B",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        marginBottom: 20,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "montserrat-bold",
    },
    resendButton: {
        backgroundColor: "#fff",
        borderColor: "#B0A9A9",
        borderWidth: 1,
    },
    buttonResendText: {
        color: "#B0A9A9",
    },
    svgContainer: {
        marginBottom: 20,
    },
});

export default VerificationScreen;

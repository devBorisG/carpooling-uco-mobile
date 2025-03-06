/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Line } from "react-native-svg";
import BackButton from "../components/common/BackButton";
import OTPInput from "../components/common/OTPInput";
import Button from "../components/common/Button";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const optIcon = require("../../assets/img/VerificationCode.jpg");

const VerificationScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState("");

    const handleVerify = () => {
        console.log("OTP verificado:", otp);
        navigation.navigate("SelectRoleScreen");
    };

    const handleResend = () => {
        console.log("Código reenviado");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BackButton />
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

                {/* Componente OTP reutilizable */}
                <OTPInput otp={otp} setOtp={setOtp} autoFocus={true} />

                {/* Botón Verificar */}
                <Button
                    title="Verificar"
                    onPress={handleVerify}
                    icon={<Entypo name="check" size={24} color="#fff" />}
                />

                {/* Botón Reenviar código */}
                <Button
                    title="Reenviar código"
                    onPress={handleResend}
                    variant="secondary"
                    icon={<MaterialCommunityIcons name="reload" size={24} color="#B0A9A9" />}
                />
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
    svgContainer: {
        marginBottom: 20,
    },
});

export default VerificationScreen;

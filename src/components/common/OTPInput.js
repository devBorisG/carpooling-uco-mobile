/*eslint-disable*/
import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";

const OTPInput = ({ otp, setOtp, autoFocus = false }) => {
    const otpInputRef = useRef(null);

    const handleOTPPress = () => {
        if (otpInputRef.current) {
            otpInputRef.current.focus();
        }
    };

    return (
        <View style={styles.otpWrapper}>
            {/* TextInput oculto para captar la entrada */}
            <TextInput
                ref={otpInputRef}
                style={styles.hiddenInput}
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={(text) => {
                    // Filtra solo dígitos
                    const numericText = text.replace(/\D/g, "");
                    setOtp(numericText);
                }}
                autoFocus={autoFocus}
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
        </View>
    );
};

const styles = StyleSheet.create({
    otpWrapper: {
        width: "80%",
    },
    hiddenInput: {
        position: "absolute",
        opacity: 0,
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
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
});

export default OTPInput;

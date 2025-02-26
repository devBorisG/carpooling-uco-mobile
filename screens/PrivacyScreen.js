/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";

const PrivacyScreen = () => {

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Política de Privacidad</Text>
            <Text style={styles.content}>
                Aquí se describe la política de privacidad de la aplicación.
                [Contenido de ejemplo...]
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 90,
    },
    title: {
        fontSize: 24,
        fontFamily: "montserrat-bold",
        color: "#00473B",
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        fontFamily: "montserrat-regular",
        color: "#000",
    },
});

export default PrivacyScreen;

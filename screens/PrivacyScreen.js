/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PrivacyScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={45} color="#042940" />
            </TouchableOpacity>
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
    },
    backButton: {
        marginTop: 30,
        marginBottom: 20,
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

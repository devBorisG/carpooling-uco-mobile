/* eslint-disable */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AllowLocationScreen = () => {
    const navigation = useNavigation();

    const handleAllowLocation = () => {
        // Aquí debes implementar la solicitud real de permisos de ubicación
        console.log("Permiso de ubicación solicitado");
        navigation.navigate("LoginScreen");
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <Image
                source={require("../assets/img/onboarding4.jpg")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Permiso de ubicación</Text>
            <Text style={styles.description}>
                Para ofrecerte una experiencia completa, necesitamos acceso a tu ubicación.
            </Text>
            <Button
                title="Permitir Ubicación"
                onPress={handleAllowLocation}
                icon={<FontAwesome6 name="location-dot" size={24} color="white" />}
            />
            <TouchableOpacity onPress={handleAllowLocation}>
                <Text style={styles.skipText}>Saltar por ahora</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "center",
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
        fontSize: 40,
        fontFamily: "montserrat-bold",
        color: "#005C53",
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 22,
        fontFamily: "montserrat-semibold",
        color: "#7D7474",
        textAlign: "center",
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    locationButton: {
        marginBottom: 20,
    },
    locationButtonText: {
        fontSize: 22,
    },
    skipText: {
        fontSize: 22,
        fontFamily: "montserrat-bold",
        color: "#B2AFAF",
        textDecorationLine: "underline",
    },
});

export default AllowLocationScreen;
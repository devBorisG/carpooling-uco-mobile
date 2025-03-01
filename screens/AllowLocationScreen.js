/* eslint-disable */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AllowLocationScreen = () => {
    const navigation = useNavigation();

    const defaultLocation = {
        latitude: 6.17807,
        longitude: -75.6193,
    };

    const handleAllowLocation = async () => {
        try {
            // Solicita permisos de ubicación en primer plano
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                // Si no se concede el permiso, mostramos un aviso y usamos ubicación por defecto
                Alert.alert(
                    "Permiso denegado",
                    "No se pudo acceder a tu ubicación. Se usará una ubicación por defecto.",
                    [{ text: "OK" }]
                );
                await AsyncStorage.setItem("userLocation", JSON.stringify(defaultLocation));
                navigation.navigate("SingUpScreen");
                return;
            }
            // Obtener la ubicación actual
            let location = await Location.getCurrentPositionAsync({});
            console.log("Ubicación obtenida:", location.coords);
            await AsyncStorage.setItem("userLocation", JSON.stringify(location.coords));
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Error al obtener la ubicación:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error al obtener tu ubicación. Se usará una ubicación por defecto.",
                [{ text: "OK" }]
            );
            await AsyncStorage.setItem("userLocation", JSON.stringify(defaultLocation));
            navigation.navigate("HomeScreen");
        }
    };

    const handleNotAllowLocation = async () => {
        await AsyncStorage.setItem("userLocation", JSON.stringify(defaultLocation));
        navigation.navigate("SignUpScreen");
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
            <TouchableOpacity onPress={handleNotAllowLocation}>
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
    skipText: {
        fontSize: 22,
        fontFamily: "montserrat-bold",
        color: "#76af68",
        textDecorationLine: "underline",
    },
});

export default AllowLocationScreen;

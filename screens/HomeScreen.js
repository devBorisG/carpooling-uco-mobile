/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
    const [region, setRegion] = useState({
        latitude: 6.17807,      // Rionegro, Antioquia
        longitude: -75.6193,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const mapRef = useRef(null);

    useEffect(() => {
        const loadLocation = async () => {
            try {
                const storedLocation = await AsyncStorage.getItem("userLocation");
                if (storedLocation) {
                    const { latitude, longitude } = JSON.parse(storedLocation);
                    setRegion((prevRegion) => ({
                        ...prevRegion,
                        latitude,
                        longitude,
                    }));
                }
            } catch (error) {
                console.error("Error al cargar la ubicación:", error);
            }
        };

        loadLocation();
    }, []);

    // Reinicia la orientación del mapa a norte (heading 0)
    const resetMapHeading = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera(
                {
                    heading: 0,
                },
                { duration: 500 }
            );
        }
    };

    // Centra el mapa en la ubicación del usuario
    const centerOnUser = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera(
                {
                    center: {
                        latitude: region.latitude,
                        longitude: region.longitude,
                    },
                },
                { duration: 500 }
            );
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                showsUserLocation={true}
                showsCompass={false}  // Ocultamos la brújula nativa para usar la personalizada
                showsMyLocationButton={false}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar viaje"
                placeholderTextColor="#999"
            />

            {/* Contenedor para los controles: brújula y botón de enfoque */}
            <View style={styles.mapControlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={resetMapHeading}>
                    <Ionicons name="compass" size={30} color="#00473B" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.focusButton]} onPress={centerOnUser}>
                    <Ionicons name="locate" size={30} color="#00473B" />
                </TouchableOpacity>
            </View>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchInput: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 18,
        fontFamily: "montserrat-regular",
        color: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        height: 50,
    },
    // Contenedor de los controles de mapa (brújula y enfoque)
    mapControlsContainer: {
        position: "absolute",
        top: 120, // posición de la brújula
        right: 20,
        alignItems: "center",
    },
    controlButton: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    // Agrega un margen superior para separar el botón de enfoque de la brújula
    focusButton: {
        marginTop: 10,
    },
});

export default HomeScreen;

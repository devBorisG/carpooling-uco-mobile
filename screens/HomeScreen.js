/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/SideBar";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const names = [
    "Jarod", "Jarod Sapo", "Rafa", "Felipito", "Morronga",
    "Pepito", "Rafael", "Boris", "Luis", "Carlos"
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [region, setRegion] = useState(null);
    const [mockCars, setMockCars] = useState([]);  // Inicialmente vacío
    const mapRef = useRef(null);

    useEffect(() => {
        const loadLocation = async () => {
            try {
                const storedLocation = await AsyncStorage.getItem("userLocation");
                if (storedLocation) {
                    const { latitude, longitude } = JSON.parse(storedLocation);
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            } catch (error) {
                console.error("Error al cargar la ubicación:", error);
            }
        };

        loadLocation();
    }, []);

    useEffect(() => {
        if (region && mockCars.length === 0) { // 🚀 Solo genera los autos si no existen
            const generateMockCars = () => {
                return Array.from({ length: 10 }).map((_, index) => ({
                    id: index + 1,
                    name: names[index % names.length],
                    latitude: region.latitude + (Math.random() * 0.03 - 0.015),
                    longitude: region.longitude + (Math.random() * 0.03 - 0.015),
                    rotation: Math.random() * 360,
                }));
            };
            setMockCars(generateMockCars());
        }
    }, [region]); // Solo ejecuta esto cuando `region` cambia por primera vez

    const resetMapHeading = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera({ heading: 0 }, { duration: 500 });
        }
    };

    const centerOnUser = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera({ center: region }, { duration: 500 });
        }
    };

    const handleOptionPress = (option) => {
        console.log("Opción seleccionada:", option);
        setSidebarVisible(false);
    };

    // Footer actions
    const handleMenuPress = () => {
        setSidebarVisible((prev) => !prev);
    };

    const handleHomePress = () => {
        setSidebarVisible(false);
        navigation.navigate("HomeScreen");
    };

    return (
        <View style={styles.container}>
            {region ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={region}
                    showsUserLocation={true}
                    showsCompass={false}
                    showsMyLocationButton={false}
                >
                    {/* Marcador de la ubicación actual */}
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />

                    {/* Marcadores de autos cercanos con iconos y rotación */}
                    {mockCars.map((car) => (
                        <Marker
                            key={car.id}
                            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
                            title={car.name}
                        >
                            <View style={{ transform: [{ rotate: `${car.rotation}deg` }] }}>
                                <FontAwesome6 name="car-side" size={20} color="green" />
                            </View>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Ionicons name="location-outline" size={50} color="#00473B" />
                </View>
            )}

            <TextInput style={styles.searchInput} placeholder="Buscar viaje" placeholderTextColor="#999" />

            <View style={styles.mapControlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={resetMapHeading}>
                    <Ionicons name="compass" size={30} color="#00473B" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.focusButton]} onPress={centerOnUser}>
                    <Ionicons name="locate" size={30} color="#00473B" />
                </TouchableOpacity>
            </View>

            <Footer onMenuPress={handleMenuPress} onHomePress={handleHomePress} />
            <Sidebar visible={sidebarVisible} onClose={handleMenuPress} onOptionPress={handleOptionPress} />
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    mapControlsContainer: {
        position: "absolute",
        top: 120,
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
    focusButton: {
        marginTop: 10,
    },
});

export default HomeScreen;

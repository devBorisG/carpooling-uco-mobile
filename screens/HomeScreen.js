/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, Animated, Platform } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/SideBar";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const names = [
    "Jarod", "Jarod Sapo", "Rafa", "Felipito", "Morronga",
    "Pepito", "Rafael", "Boris", "Luis", "Carlos"
];

const createAnimatedCoordinate = (latitude, longitude) => {
    return new AnimatedRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [region, setRegion] = useState(null);
    const [mockCars, setMockCars] = useState([]); // Arreglo de carros animados
    const mapRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;


    // Animación del círculo pulsante
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1200,
                    useNativeDriver: false,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    // Cargar ubicación del usuario desde AsyncStorage
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

    // Generar carros animados una sola vez cuando la región esté disponible
    useEffect(() => {
        if (region && mockCars.length === 0) {
            const generateMockCars = () => {
                return Array.from({ length: 10 }).map((_, index) => ({
                    id: index + 1,
                    name: names[index % names.length],
                    // Se genera una posición aleatoria cerca de la ubicación del usuario
                    animatedCoordinate: createAnimatedCoordinate(
                        region.latitude + (Math.random() * 0.03 - 0.015),
                        region.longitude + (Math.random() * 0.03 - 0.015)
                    ),
                    rotation: Math.random() * 360,
                }));
            };
            setMockCars(generateMockCars());
        }
    }, [region]);

    // Simula el movimiento de los carros actualizando su AnimatedRegion
    useEffect(() => {
        if (mockCars.length > 0) {
            const intervalId = setInterval(() => {
                mockCars.forEach((car) => {
                    const currentPos = car.animatedCoordinate.__getValue();
                    const newLatitude = currentPos.latitude + (Math.random() * 0.001 - 0.0005);
                    const newLongitude = currentPos.longitude + (Math.random() * 0.001 - 0.0005);

                    car.animatedCoordinate.timing({
                        latitude: newLatitude,
                        longitude: newLongitude,
                        duration: 1000,
                        useNativeDriver: false,
                    }).start();
                });
            }, 3000); // Actualiza cada 2 segundos

            return () => clearInterval(intervalId);
        }
    }, [mockCars]);

    const resetMapHeading = () => {
        if (mapRef.current) {
            mapRef.current.animateCamera({ heading: 0 }, { duration: 500 });
        }
    };

    const centerOnUser = () => {
        if (mapRef.current && region) {
            mapRef.current.animateCamera({ center: region }, { duration: 500 });
        }
    };


    // Función para hacer zoom in
    const zoomIn = async () => {
        if (mapRef.current) {
            try {
                const camera = await mapRef.current.getCamera();
                if (!camera || !camera.center || isNaN(camera.center.latitude) || isNaN(camera.center.longitude)) {
                    console.error("Cámara no válida:", camera);
                    return;
                }
                let newLatitudeDelta;
                if (Platform.OS === "ios") {
                    // En iOS usamos la altitude si está disponible
                    newLatitudeDelta = Math.max((camera.altitude || 0) / 20000, 0.002);
                } else {
                    // En Android, usamos el delta actual y lo reducimos
                    newLatitudeDelta = Math.max(region.latitudeDelta / 1.5, 0.002);
                }
                const newLongitudeDelta = newLatitudeDelta; // Asumiendo proporción 1:1

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: newLatitudeDelta,
                    longitudeDelta: newLongitudeDelta,
                }, 500);
            } catch (error) {
                console.error("Error al obtener la cámara:", error);
            }
        }
    };

    // Función para hacer zoom out
    const zoomOut = async () => {
        if (mapRef.current) {
            try {
                const camera = await mapRef.current.getCamera();
                if (!camera || !camera.center || isNaN(camera.center.latitude) || isNaN(camera.center.longitude)) {
                    console.error("Cámara no válida:", camera);
                    return;
                }
                let newLatitudeDelta;
                if (Platform.OS === "ios") {
                    newLatitudeDelta = Math.min((camera.altitude || 0) / 20000, 1);
                } else {
                    // En Android, aumentamos el delta actual
                    newLatitudeDelta = Math.min(region.latitudeDelta * 1.5, 1);
                }
                const newLongitudeDelta = newLatitudeDelta; // Asumiendo proporción 1:1

                mapRef.current.animateToRegion({
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                    latitudeDelta: newLatitudeDelta,
                    longitudeDelta: newLongitudeDelta,
                }, 500);
            } catch (error) {
                console.error("Error al obtener la cámara:", error);
            }
        }
    };






    const handleOptionPress = (option) => {
        console.log("Opción seleccionada:", option);
        setSidebarVisible(false);
    };

    // Acciones del Footer
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
                    showsUserLocation={false}
                    showsCompass={false}
                    showsMyLocationButton={false}
                >

                    {/* Círculo de ubicación actual animado */}
                    {region && (
                        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                            <View style={styles.markerContainer}>
                                <View style={styles.outerCircle} />
                                <Animated.View style={[styles.pulsatingCircle, { transform: [{ scale: pulseAnim }] }]} />
                                <View style={styles.innerCircle} />
                            </View>
                        </Marker>
                    )}
                    {/* Marcadores animados de autos cercanos */}
                    {mockCars.map((car) => (
                        <Marker.Animated
                            key={car.id}
                            coordinate={car.animatedCoordinate}
                            title={car.name}
                        >
                            <View style={{ transform: [{ rotate: `${car.rotation}deg` }] }}>
                                <Image
                                    source={require("../assets/img/car-2d.png")}
                                    style={{ width: 40, height: 40, resizeMode: "contain", backgroundColor: "transparent" }}
                                />
                            </View>
                        </Marker.Animated>
                    ))}
                </MapView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Ionicons name="location-outline" size={50} color="#00473B" />
                </View>
            )}

            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchBox} onPress={() => navigation.navigate("BookingScreen")}>
                    <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Buscar viaje</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.mapControlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={resetMapHeading}>
                    <Ionicons name="compass" size={30} color="#00473B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={centerOnUser}>
                    <Ionicons name="locate" size={30} color="#00473B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
                    <Ionicons name="add-circle" size={30} color="#00473B" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
                    <Ionicons name="remove-circle" size={30} color="#00473B" />
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
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },    
  searchPlaceholder: {
    fontSize: 18,
    color: "rgba(0,0,0,0.4)",
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "white",
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  pulsatingCircle: {
    width: 17.5,
    height: 17.5,
    borderRadius: 100,
    backgroundColor: "rgba(0, 122, 255, 1)",
    position: "absolute",
  },

  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    height: 50,
  },
  searchIcon: {
    marginRight: 10, // Espacio entre la lupa y el texto
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: "montserrat-regular",
    color: "#000",
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

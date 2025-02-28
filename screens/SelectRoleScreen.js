import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Line } from "react-native-svg";

const driverImage = require("../assets/img/rol_conductor.jpg");
const passengerImage = require("../assets/img/rol_pasajero.jpg");

const { width } = Dimensions.get("window");

const SelectRoleScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Selecciona tu <Text style={styles.boldText}>rol</Text>
            </Text>

            {/* Línea decorativa */}
            <View style={styles.svgContainer}>
                <Svg height="10" width="150">
                    <Line x1="0" y1="0" x2="60" y2="0" stroke="#00473B" strokeWidth="8" strokeOpacity={0.7} strokeLinecap="round" />
                </Svg>
            </View>

            {/* Opción: Conductor */}
            <TouchableOpacity 
                style={styles.option} 
                onPress={() => navigation.navigate("DriverScreen")}
            >
                <View style={styles.imageContainer}>
                    <Image source={driverImage} style={styles.image} />
                </View>
                <View style={[styles.textContainer, styles.driverBackground]}>
                    <Text style={styles.optionText}>Conductor</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.orText}>o</Text>

            {/* Opción: Pasajero */}
            <TouchableOpacity 
                style={styles.option} 
                onPress={() => navigation.navigate("PassengerScreen")}
            >
                <View style={styles.imageContainer}>
                    <Image source={passengerImage} style={styles.image} />
                </View>
                <View style={[styles.textContainer, styles.passengerBackground]}>
                    <Text style={styles.optionText}>Pasajero</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontFamily: "montserrat-bold",
        color: "#00473B",
        textAlign: "center",
    },
    boldText: {
        fontWeight: "bold",
    },
    svgContainer: {
        alignItems: "flex-start",
        marginBottom: 25,
    },
    option: {
        width: width * 0.8,
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    imageContainer: {
        width: "100%",
        height: "70%",
        backgroundColor: "#FFFFFF", // Fondo blanco para separar de la parte inferior
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    textContainer: {
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    driverBackground: {
        backgroundColor: "#D1F5D3",
    },
    passengerBackground: {
        backgroundColor: "#E5D3FF",
    },
    optionText: {
        fontSize: 22,
        fontFamily: "montserrat-semibold",
        color: "#00473B",
    },
    orText: {
        fontSize: 18,
        fontFamily: "montserrat-semibold",
        marginVertical: 10,
        color: "#7D7D7D",
    },
});

export default SelectRoleScreen;

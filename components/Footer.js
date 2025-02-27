/* eslint-disable */
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

const Footer = ({ onMenuPress, onHomePress }) => {
    // Controla el índice del icono activo
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index) => {
        setActiveIndex(index);
        // Aquí podrías agregar navegación o cualquier otra acción
        switch (index) {
            case 0:
                console.log("Home");
                onHomePress();
                break;
            case 1:
                console.log("Viaje");
                break;
            case 2:
                console.log("Chat");
                break;
            case 3:
                console.log("Menú");
                onMenuPress();
                break;
        };
    };

    // Color inactivo: negro con opacidad 80% (rgba(0, 0, 0, 0.8))
    // Color activo: #308A5A
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(0)}>
                <Ionicons
                    name="home"
                    size={30}
                    color={activeIndex === 0 ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === 0 ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(1)}>
                <MaterialIcons
                    name="directions-car"
                    size={30}
                    color={activeIndex === 1 ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === 1 ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Viaje
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(2)}>
                <Feather
                    name="message-circle"
                    size={30}
                    color={activeIndex === 2 ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === 2 ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Chat
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(3)}>
                <Feather
                    name="menu"
                    size={30}
                    color={activeIndex === 3 ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === 3 ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Menú
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    iconButton: {
        padding: 10,
    },
});

export default Footer;

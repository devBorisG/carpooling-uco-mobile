/* eslint-disable */
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

let accountIndex = 0;
let homeIndex = 1;
let tripIndex = 2;
let chatIndex = 3;

const Footer = ({ onMenuPress, onHomePress }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index) => {
        setActiveIndex(index);
        switch (index) {
            case 0:
                console.log("Menú");
                onMenuPress();
                break;
            case 1:
                console.log("Home");
                onHomePress();
                break;
            case 2:
                console.log("Viaje");
                break;
            case 3:
                console.log("Chat");
                break;
        };
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(accountIndex)}>
                <MaterialCommunityIcons
                    name="account"
                    size={30}
                    color={activeIndex === accountIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === accountIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Cuenta
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(homeIndex)}>
                <Ionicons
                    name="home"
                    size={30}
                    color={activeIndex === homeIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === homeIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(tripIndex)}>
                <MaterialIcons
                    name="directions-car"
                    size={30}
                    color={activeIndex === tripIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === tripIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Viaje
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePress(chatIndex)}>
                <Feather
                    name="message-circle"
                    size={30}
                    color={activeIndex === chatIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)"}
                />
                <Text style={{ color: activeIndex === chatIndex ? "#308A5A" : "rgba(0, 0, 0, 0.8)" }}>
                    Chat
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
        alignItems: "center",
    },
});

export default Footer;

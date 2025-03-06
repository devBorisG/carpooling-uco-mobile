/* eslint-disable */
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../utils/constants";

// Índices de las opciones del footer
const FOOTER_ITEMS = {
    HOME: 0,
    TRIP: 1,
    CHAT: 2,
    ACCOUNT: 3,
};

/**
 * Componente Footer para la navegación principal
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onMenuPress - Función para manejar el clic en el menú
 * @param {Function} props.onHomePress - Función para manejar el clic en home
 * @param {Function} props.onTripPress - Función para manejar el clic en viaje
 * @param {Function} props.onChatPress - Función para manejar el clic en chat
 * @returns {JSX.Element} Componente Footer
 */
const Footer = ({
    onMenuPress,
    onHomePress,
    onTripPress,
    onChatPress,
    initialActiveIndex = FOOTER_ITEMS.HOME
}) => {
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    const handlePress = (index) => {
        setActiveIndex(index);

        switch (index) {
            case FOOTER_ITEMS.HOME:
                console.log("Home");
                onHomePress?.();
                break;
            case FOOTER_ITEMS.TRIP:
                console.log("Viaje");
                onTripPress?.();
                break;
            case FOOTER_ITEMS.CHAT:
                console.log("Chat");
                onChatPress?.();
                break;
            case FOOTER_ITEMS.ACCOUNT:
                console.log("Menú");
                onMenuPress?.();
                break;
            default:
                break;
        }
    };

    // Función para determinar el color según el estado activo
    const getColor = (index) => activeIndex === index ? COLORS.SECONDARY : "rgba(0, 0, 0, 0.8)";

    return (
        <View style={styles.footer}>
            <FooterItem
                icon={<Ionicons name="home" size={30} color={getColor(FOOTER_ITEMS.HOME)} />}
                label="Home"
                color={getColor(FOOTER_ITEMS.HOME)}
                onPress={() => handlePress(FOOTER_ITEMS.HOME)}
            />

            <FooterItem
                icon={<MaterialIcons name="directions-car" size={30} color={getColor(FOOTER_ITEMS.TRIP)} />}
                label="Viaje"
                color={getColor(FOOTER_ITEMS.TRIP)}
                onPress={() => handlePress(FOOTER_ITEMS.TRIP)}
            />

            <FooterItem
                icon={<Feather name="message-circle" size={30} color={getColor(FOOTER_ITEMS.CHAT)} />}
                label="Chat"
                color={getColor(FOOTER_ITEMS.CHAT)}
                onPress={() => handlePress(FOOTER_ITEMS.CHAT)}
            />

            <FooterItem
                icon={<MaterialCommunityIcons name="account" size={30} color={getColor(FOOTER_ITEMS.ACCOUNT)} />}
                label="Cuenta"
                color={getColor(FOOTER_ITEMS.ACCOUNT)}
                onPress={() => handlePress(FOOTER_ITEMS.ACCOUNT)}
            />
        </View>
    );
};

/**
 * Componente para cada ítem del footer
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.icon - Icono a mostrar
 * @param {string} props.label - Etiqueta del ítem
 * @param {string} props.color - Color del texto
 * @param {Function} props.onPress - Función para manejar el clic
 * @returns {JSX.Element} Componente FooterItem
 */
const FooterItem = ({ icon, label, color, onPress }) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
        {icon}
        <Text style={{ color, fontFamily: FONTS.REGULAR }}>
            {label}
        </Text>
    </TouchableOpacity>
);

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
        backgroundColor: COLORS.WHITE,
        borderTopWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
    },
    iconButton: {
        padding: 10,
        alignItems: "center",
    },
});

export default Footer;

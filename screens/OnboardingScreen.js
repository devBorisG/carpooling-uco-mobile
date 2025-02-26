/* eslint-disable */
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const pages = [
        {
            title: "Solicitar viaje",
            description: "Solicita un viaje y que te recoja un conductor cercano.",
            image: require("../assets/img/onboarding1.jpg"),
        },
        {
            title: "Seguimiento en tiempo real",
            description:
                "Conoce a tu conductor de antemano y visualiza su ubicación en el mapa.",
            image: require("../assets/img/onboarding2.jpg"),
        },
        {
            title: "Ganar dinero",
            description:
                "Ofrece viajes a lugares cercanos, usa códigos promocionales y gana dinero.",
            image: require("../assets/img/onboarding3.jpg"),
        },
    ];

    const handleScroll = (event) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / width);
        setCurrentIndex(index);
    };

    // Navegar a la screen de permiso de ubicación
    const handleSkip = () => {
        navigation.navigate("AllowLocationScreen");
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                pagingEnabled
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
            >
                {pages.map((page, index) => (
                    <View key={index} style={[styles.page, { width }]}>
                        {page.image && (
                            <Image
                                source={page.image}
                                style={styles.pageImage}
                                resizeMode="contain"
                            />
                        )}
                        <Text style={styles.pageTitle}>{page.title}</Text>
                        <Text style={styles.pageDescription}>{page.description}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Footer fijo */}
            {currentIndex < 3 && (
                <View style={styles.footer}>
                    <View style={styles.dotsContainer}>
                        {pages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentIndex === index && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                    <View style={styles.buttonContainer}>
                        {currentIndex === pages.length - 1 ? (
                            <Button
                                title="Empezar"
                                onPress={handleSkip}
                                buttonStyle={{ width: "100%" }}
                                icon={<Feather name="arrow-right" size={20} color="#fff" />}
                            />
                        ) : (
                            <TouchableOpacity onPress={handleSkip}>
                                <Text style={styles.skipText}>Saltar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    pageImage: {
        width: "100%",
        height: 350,
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 40,
        fontFamily: "montserrat-bold",
        color: "#005C53",
        marginBottom: 10,
        textAlign: "center",
    },
    pageDescription: {
        fontSize: 22,
        fontFamily: "montserrat-semibold",
        color: "#7D7474",
        textAlign: "center",
        paddingHorizontal: 20,
    },
    footer: {
        position: "absolute",
        bottom: 70, // Posición fija respecto al borde inferior
        left: 0,
        right: 0,
        height: 80, // altura fija para el footer
        paddingHorizontal: 20,
        justifyContent: "space-between", // o "flex-end" si prefieres
        alignItems: "center",
    },
    dotsContainer: {
        flexDirection: "row",
        marginBottom: 20, // Separa los dots del botón
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#BEBEBE",
        marginHorizontal: 10,
    },
    activeDot: {
        backgroundColor: "#00473B",
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    buttonContainer: {
        // Aquí puedes ajustar el margen superior para mover el botón sin afectar a los dots
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    skipText: {
        fontSize: 22,
        fontFamily: "montserrat-bold",
        color: "#B2AFAF",
        textDecorationLine: "underline",
    },
    skipButton: {
        backgroundColor: "transparent",
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: "auto",
    },
    skipButtonText: {
        fontSize: 22,
        fontFamily: "montserrat-bold",
        color: "#00473B",
    },
});

export default OnboardingScreen;

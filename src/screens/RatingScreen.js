import React, {useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTS, SCREENS, SIZES, TIMES} from "../utils/constants";
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../toastConfig';

const RatingScreen = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const navigation = useNavigation();
    const route = useRoute();
    // Recibir los parámetros de la navegación
    const { 
        driver, 
        driverLicense,
        driverImage,
        tripInfo = {} 
    } = route.params || {
        driver: "Jarod Herrera", 
        driverLicense: "DL 5C AB 1234",
        driverImage: null,
        driverRating: 4.8
    };
    const SCORE = [1, 2, 3, 4, 5];
    const DEFAULT_IMAGE = require("../../assets/img/jarodsito.png");
    // Determinar qué imagen mostrar
    let imageSource = DEFAULT_IMAGE;
    if (driverImage) {
        // Si driverImage es una ruta de recurso local (require)
        if (typeof driverImage === 'number') {
            imageSource = driverImage;
        } 
        // Si driverImage es una URL
        else if (typeof driverImage === 'string' && driverImage.startsWith('http')) {
            imageSource = { uri: driverImage };
        }
    }
    
    const handleSubmit = () => {
        console.log("handleSubmit ejecutado");
        if (rating === 0) {
            Toast.show({
                type: "error",
                text1: "La calificación es requerida",
                text2: "Por favor, califica tu experiencia",
                position: "top",
                visibilityTime: TIMES.TOAST_DURATION, // Tiempo extendido para que sea más visible
                autoHide: true,
            });
            return; // Detener la ejecución si no hay calificación
        }
        // Mostrar mensaje de éxito
        Toast.show({
            type: "success",
            text1: "¡Gracias por tu calificación! \u2B50",
            text2: `Has calificado a ${driver} con ${rating} \nestrellas`,
            position: "top",
            visibilityTime: TIMES.TOAST_DURATION, // Tiempo suficiente para leer el mensaje
            autoHide: true,
        });
        setTimeout(() => {
            navigation.navigate(SCREENS.BOOKING);
        }, 700); // 2.5 segundos para coincidir con el visibilityTime del Toast
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <BackButton />
            </View>
            <Text style={styles.title}>Rating</Text>

            <View style={styles.card}>
                <Image source={imageSource} style={styles.profileImage} />
                <Text style={styles.name}>{driver}</Text>
                <Text style={styles.license}>{driverLicense}</Text>
                
                {/* Mostrar información del viaje si está disponible */}
                {tripInfo && (tripInfo.origin || tripInfo.destination) && (
                    <View style={styles.tripSummary}>
                        {tripInfo.origin && (
                            <Text style={styles.tripDetail}>
                                <Text style={styles.detailLabel}>Desde: </Text>
                                {tripInfo.origin}
                            </Text>
                        )}
                        {tripInfo.destination && (
                            <Text style={styles.tripDetail}>
                                <Text style={styles.detailLabel}>Hasta: </Text>
                                {tripInfo.destination}
                            </Text>
                        )}
                    </View>
                )}
                
                <Text style={styles.question}>¿Qué tal el viaje?</Text>
                <Text style={styles.subText}>Sus comentarios ayudarán a mejorar la experiencia de conducción</Text>

                <View style={styles.starsContainer}>
                    {SCORE.map((index) => (
                        <TouchableOpacity key={index} onPress={() => setRating(index)}>
                            <FontAwesome name={index <= rating ? "star" : "star-o"} size={32} color={COLORS.STAR} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TextInput
                    style={styles.commentBox}
                    placeholder="¿Algún comentario adicional?"
                    value={comment}
                    onChangeText={setComment}
                    multiline
                />

                <Button
                    title="Enviar"
                    onPress={handleSubmit}
                    buttonStyle={{ width: "100%" }}
                    icon={<Feather name="send" size={20} color={COLORS.WHITE} />}
                />
                <TouchableOpacity onPress={() => navigation.navigate(SCREENS.BOOKING)} style={styles.skipButton}>
                    <Text style={styles.skipText}>Saltar por ahora</Text>
                </TouchableOpacity>
                <Toast config={toastConfig}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tripSummary: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
    },
    tripDetail: {
        fontSize: SIZES.FONT_SMALL,
        color: COLORS.BLACK,
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.PADDING_LARGE,
    },
    backButtonContainer: {
        position: "absolute",
        top: 40,
        left: 0,
        width: "100%",
        zIndex: 10,
    },
    title: {
        position: "absolute",
        top: 60,
        width: "100%",
        textAlign: "center",
        fontSize: SIZES.FONT_XXLARGE,
        fontFamily: FONTS.BOLD,
        color: COLORS.PRIMARY,
    },
    card: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        width: "90%",
        elevation: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: SIZES.FONT_LARGE,
        fontFamily: FONTS.SEMIBOLD,
    },
    license: {
        fontSize: SIZES.FONT_SMALL,
        color: COLORS.GRAY,
        marginBottom: 10,
    },
    question: {
        fontSize: SIZES.FONT_XLARGE,
        fontFamily: FONTS.BOLD,
        textAlign: "center",
    },
    subText: {
        fontSize: SIZES.FONT_SMALL,
        color: COLORS.GRAY,
        textAlign: "center",
        marginBottom: 15,
    },
    starsContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    commentBox: {
        width: "100%",
        height: 80,
        borderColor: COLORS.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 15,
    },
    skipButton: {
        paddingVertical: 10,
    },
    skipText: {
        fontSize: SIZES.FONT_LARGE,
        fontFamily: FONTS.BOLD,
        color: COLORS.SECONDARY_LIGHT,
        textDecorationLine: "underline",
    },
});

export default RatingScreen;
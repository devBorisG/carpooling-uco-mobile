import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTS, SCREENS, SIZES } from "../utils/constants";
import Toast from "react-native-toast-message";

const RatingScreen = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (rating === 0) {
            Toast.show({
                type: "error",
                text1: "La calificación es requerida",
                text2: "Porfavor, califica tu experiencia",
                position: "top",
            });
            return;
        }
        navigation.navigate(SCREENS.HOME);
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <BackButton />
            </View>
            <Text style={styles.title}>Rating</Text>

            <View style={styles.card}>
                <Image source={require("../../assets/img/jarodsito.png")} style={styles.profileImage} />
                <Text style={styles.name}>Jarod Herrera</Text>
                <Text style={styles.license}>DL 5C AB 1234</Text>

                <Text style={styles.question}>¿Qué tal el viaje?</Text>
                <Text style={styles.subText}>Sus comentarios ayudarán a mejorar la experiencia de conducción</Text>

                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity key={index} onPress={() => setRating(index)}>
                            <FontAwesome name={index <= rating ? "star" : "star-o"} size={32} color="#FFD700" />
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
                <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME)} style={styles.skipButton}>
                    <Text style={styles.skipText}>Saltar por ahora</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        color: COLORS.SECONDARY,
        textDecorationLine: "underline",
    },
});

export default RatingScreen;
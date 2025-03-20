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
            <View style={styles.header}>
                <BackButton />
                <Text style={styles.title}>Rating</Text>
            </View>

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
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        top: 50,
        paddingHorizontal: SIZES.PADDING_LARGE,
    },
    title: {
        flex: 1,
        fontSize: SIZES.FONT_XXLARGE,
        fontFamily: FONTS.BOLD,
        color: COLORS.PRIMARY,
        textAlign: "center",
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
        fontSize: 14,
        color: "#7D7D7D",
        marginBottom: 10,
    },
    question: {
        fontSize: SIZES.FONT_XLARGE,
        fontFamily: FONTS.BOLD,
        textAlign: "center",
    },
    subText: {
        fontSize: 14,
        color: "#7D7D7D",
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
        borderColor: "#CCCCCC",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 15,
    },
});

export default RatingScreen;
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import { COLORS, FONTS, SCREENS, SIZES } from "../utils/constants";

const RatingScreen = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

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
                
                <Text style={styles.question}>How was your trip?</Text>
                <Text style={styles.subText}>Your feedback will help improve driving experience</Text>

                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity key={index} onPress={() => setRating(index)}>
                            <FontAwesome name={index <= rating ? "star" : "star-o"} size={32} color="#FFD700" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TextInput
                    style={styles.commentBox}
                    placeholder="Additional comments..."
                    value={comment}
                    onChangeText={setComment}
                    multiline
                />
                
                <Button 
                    title="Enviar" 
                    // TODO definir logica de la acción
                    onPress={() => console.log("Enviar")} 
                    buttonStyle={{ width: "100%" }} 
                    icon={<Entypo name="login" size={20} color={COLORS.WHITE} />} 
                    // TODO definir logica de validaciones.
                    // disabled={!isValid}
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
        position: "absolute",
        top: 50,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: SIZES.FONT_XXLARGE,
        fontFamily: FONTS.BOLD,
        marginLeft: 10,
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
        fontSize: 18,
        fontFamily: "montserrat-semibold",
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
    submitButton: {
        backgroundColor: "#2F80ED",
        paddingVertical: 12,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    submitText: {
        color: "#FFF",
        fontSize: SIZES.FONT_LARGE,
        fontFamily: FONTS.BOLD,
    },
});

export default RatingScreen;
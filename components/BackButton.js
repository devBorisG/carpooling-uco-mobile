/*eslint-disable*/
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={45} color="#042940" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 30,
        left: 10,
    },
});

export default BackButton;

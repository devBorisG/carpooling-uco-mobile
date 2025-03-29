/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/common/BackButton";
import { COLORS, FONTS, SIZES } from '../utils/constants';

const PrivacyScreen = () => {

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Política de Privacidad</Text>
            <Text style={styles.content}>
                Aquí se describe la política de privacidad de la aplicación.
                [Contenido de ejemplo...]
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: SIZES.PADDING_LARGE,
        paddingTop: 90,
    },
    title: {
        fontSize: SIZES.FONT_XLARGE,
        fontFamily: FONTS.BOLD,
        color: COLORS.PRIMARY,
        marginBottom: SIZES.MARGIN_XLARGE,
    },
    content: {
        fontSize: SIZES.FONT_MEDIUM,
        fontFamily: FONTS.REGULAR,
        color: COLORS.BLACK,
    },
});

export default PrivacyScreen;

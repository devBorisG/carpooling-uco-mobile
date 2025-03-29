/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/common/BackButton";
import { COLORS, FONTS, SIZES } from '../utils/constants';

const TermsScreen = () => {

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.content}>
        Aquí se describen los términos y condiciones de uso de la aplicación.
        [Contenido de ejemplo...]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 20,
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

export default TermsScreen;

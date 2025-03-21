/*eslint-disable*/
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../utils/constants";

const Button = ({ title, onPress, variant, buttonStyle, textStyle, icon, iconStyle, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "secondary" && styles.secondary, buttonStyle]}
      onPress={onPress}
      {...props}
    >
      <View style={styles.contentContainer}>
        {icon && <View style={[styles.iconContainer, iconStyle]}>{icon}</View>}
        <Text style={[styles.buttonText, variant === "secondary" && styles.buttonSecondaryText, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: SIZES.FONT_LARGE,
    fontFamily: FONTS.BOLD,
  },
  secondary: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
  },
  buttonSecondaryText: {
    color: COLORS.SECONDARY,
  },
});

export default Button;
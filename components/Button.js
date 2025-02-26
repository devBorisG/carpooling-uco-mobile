/*eslint-disable*/
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress, variant, buttonStyle, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "resend" && styles.resendButton, buttonStyle]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.buttonText, variant === "resend" && styles.buttonResendText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00473B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-bold",
  },
  resendButton: {
    backgroundColor: "#fff",
    borderColor: "#B0A9A9",
    borderWidth: 1,
  },
  buttonResendText: {
    color: "#B0A9A9",
  },
});

export default Button;
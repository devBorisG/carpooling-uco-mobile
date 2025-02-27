/*eslint-disable*/
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const ValidatedInput = ({
    icon,
    placeholder,
    value,
    onChangeText,
    onBlur,
    errorMsg,
    keyboardType = "default",
    secureTextEntry = false,
    additionalStyle = {},
    inputIconStyle = {},
}) => {
    return (
        <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainer}>
                <Feather
                    name={icon}
                    size={25}
                    color="#BEBEBE"
                    style={[styles.inputIcon, inputIconStyle]}
                />
                <TextInput
                    style={[styles.input, errorMsg && { borderColor: "red" }, additionalStyle]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholderTextColor="#999"
                />
            </View>
            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainerMargin: {
        marginBottom: 10,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 45,
        fontFamily: "montserrat-regular",
        color: "#000",
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    errorText: {
        color: "red",
        fontSize: 13,
        marginLeft: 45,
    },
});

export default ValidatedInput;

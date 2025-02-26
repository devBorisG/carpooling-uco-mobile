/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Svg, { Line } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const singUpIcon = require("../assets/img/SingUp.jpg");

const SingUpScreen = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para manejar los errores de validación
  const [correoErrorMsg, setCorreoErrorMsg] = useState(false);
  const [celularErrorMsg, setCelularErrorMsg] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState(false);


  // Validación al perder el foco de cada campo
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setCorreoErrorMsg("Ingresa un correo válido");
    } else {
      setCorreoErrorMsg("");
    }
  };

  const validateCelular = () => {
    if (celular.trim().length < 10) {
      setCelularErrorMsg("El número de celular debe tener al menos 10 dígitos");
    } else {
      setCelularErrorMsg("");
    }
  };

  const validatePassword = () => {
    if (password.trim().length < 6) {
      setPasswordErrorMsg("La contraseña debe tener al menos 6 caracteres");
    } else {
      setPasswordErrorMsg("");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordErrorMsg("Las contraseñas no coinciden");
    } else {
      setConfirmPasswordErrorMsg("");
    }
  };

  // Validación global del formulario al presionar el botón
  const validateForm = () => {
    validateEmail();
    validateCelular();
    validatePassword();
    validateConfirmPassword();
    // Verificamos que no existan mensajes de error
    return (
      correoErrorMsg === "" &&
      celularErrorMsg === "" &&
      passwordErrorMsg === "" &&
      confirmPasswordErrorMsg === "" &&
      correo &&
      celular &&
      password &&
      confirmPassword
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={45} color="#042940" />
        </TouchableOpacity>
        <Image source={singUpIcon} style={styles.image} />
        <Text style={styles.title}>Registrarse</Text>

        {/* Línea horizontal SVG debajo del título */}
        <View style={styles.svgContainer}>
          <Svg height="10" width="150">
            <Line
              x1="0"
              y1="0"
              x2="80"
              y2="0"
              stroke="#00473B"
              strokeWidth="9"
              strokeOpacity={0.7}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Campo Correo */}
          <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color="#BEBEBE"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, correoErrorMsg && { borderColor: "red" }]}
                placeholder="Ingresar correo*"
                keyboardType="email-address"
                value={correo}
                onChangeText={(text) => {
                  setCorreo(text);
                  if (correoErrorMsg) setCorreoErrorMsg("");
                }}
                onBlur={validateEmail}
                placeholderTextColor="#999"
              />
            </View>
            {correoErrorMsg ? <Text style={styles.errorText}>{correoErrorMsg}</Text> : null}
          </View>

          {/* Campo Celular */}
          <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainer}>
              <Feather name="phone" size={20} color="#BEBEBE" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, celularErrorMsg && { borderColor: "red" }]}
                placeholder="Ingresar número celular*"
                keyboardType="phone-pad"
                value={celular}
                onChangeText={(text) => {
                  setCelular(text);
                  if (celularErrorMsg) setCelularErrorMsg("");
                }}
                onBlur={validateCelular}
                placeholderTextColor="#999"
              />
            </View>
            {celularErrorMsg ? <Text style={styles.errorText}>{celularErrorMsg}</Text> : null}
          </View>

          {/* Campo Contraseña */}
          <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#BEBEBE" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, passwordErrorMsg && { borderColor: "red" }]}
                placeholder="Ingresar contraseña*"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordErrorMsg) setPasswordErrorMsg("");
                }}
                onBlur={validatePassword}
                placeholderTextColor="#999"
              />
                            <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather name={showPassword ? "eye" : "eye-off"} size={15} color="#BEBEBE" />
              </TouchableOpacity>
            </View>
            {passwordErrorMsg ? <Text style={styles.errorText}>{passwordErrorMsg}</Text> : null}
          </View>

          {/* Campo Confirmar Contraseña */}
          <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#BEBEBE" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, confirmPasswordErrorMsg && { borderColor: "red" }]}
                placeholder="Repetir contraseña*"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (confirmPasswordErrorMsg) setConfirmPasswordErrorMsg("");
                }}
                onBlur={validateConfirmPassword}
                placeholderTextColor="#999"
              />
            </View>
            {confirmPasswordErrorMsg ? <Text style={styles.errorText}>{confirmPasswordErrorMsg}</Text> : null}
          </View>

        </View>

        {/* Términos y Condiciones */}
        <Text style={styles.termsText}>
          Al registrarte, estas aceptando nuestros{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("TermsScreen")}
          >
            Términos y Condiciones
          </Text>{" "}
          y{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("PrivacyScreen")}
          >
            Política de Privacidad
          </Text>
        </Text>

        {/* Botón Continuar */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (validateForm()) {
              navigation.navigate("VerificationScreen");
            }
          }}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        {/* Ya esta registrado */}
        <Text style={styles.termsText}>
          ¿Ya estas registrado?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Ingresar
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerMargin: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
  },
  eyeButton: {
    paddingTop: 10
  },
  image: {
    width: 280,
    height: 280,
  },
  title: {
    fontSize: 40,
    fontFamily: "montserrat-bold",
    alignSelf: "flex-start",
    color: "#005C53",
  },
  content: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 10
  },
  input: {
    flex: 1,
    height: 45,
    fontFamily: "montserrat-regular",
    color: "#000",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 0
  },
  termsText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "montserrat-regular",
  },
  link: {
    textDecorationLine: "underline",
    color: "#4A73DA",
    fontFamily: "montserrat-bold"
  },
  button: {
    backgroundColor: "#00473B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 20,
    width: "100%",
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-bold",
  },
  svgContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 45,
  },
});

export default SingUpScreen;

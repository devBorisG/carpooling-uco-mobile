/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Svg, { Line } from "react-native-svg";
import BackButton from "../components/BackButton";
import ValidatedInput from "../components/ValidatedInput";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail, isValidPhone, isValidPassword } from "../utils/validation";
import Button from "../components/Button";

const singUpIcon = require("../assets/img/SingUp.jpg");

const SingUpScreen = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [correoErrorMsg, setCorreoErrorMsg] = useState("");
  const [celularErrorMsg, setCelularErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");


  const validateEmail = () => {
    if (!isValidEmail(correo)) {
      setCorreoErrorMsg("Ingresa un correo válido");
    } else {
      setCorreoErrorMsg("");
    }
  };

  const validateCelular = () => {
    if (!isValidPhone(celular)) {
      setCelularErrorMsg("El número de celular debe tener al menos 10 dígitos");
    } else {
      setCelularErrorMsg("");
    }
  };

  const validatePassword = () => {
    if (!isValidPassword(password)) {
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
        <BackButton />
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
          <ValidatedInput
            label={"Correo*"}
            icon="mail"
            placeholder="Ingresar correo"
            keyboardType="email-address"
            value={correo}
            onChangeText={(text) => {
              setCorreo(text);
              if (correoErrorMsg) setCorreoErrorMsg("");
            }}
            onBlur={validateEmail}
            errorMsg={correoErrorMsg}
          />
          <ValidatedInput
            label={"Celular*"}
            icon="phone"
            placeholder="Ingresar número celular"
            keyboardType="phone-pad"
            value={celular}
            onChangeText={(text) => {
              setCelular(text);
              if (celularErrorMsg) setCelularErrorMsg("");
            }}
            onBlur={validateCelular}
            errorMsg={celularErrorMsg}
          />
          {/* Campo Contraseña con botón para mostrar/ocultar */}
          <View style={styles.inputContainerMargin}>
            <View style={styles.inputContainerFather}>
              <Text style={[{ marginLeft: 45, marginBottom: 3, fontSize: 16 }, passwordErrorMsg && { color: "red" }]}>Contraseña*</Text>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={25} color="#BEBEBE" style={styles.inputIcon} />
                <View style={[styles.inputWrapper, passwordErrorMsg && { borderColor: "red" }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresar contraseña"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (passwordErrorMsg) setPasswordErrorMsg("");
                    }}
                    onBlur={validatePassword}
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#BEBEBE" />
                  </TouchableOpacity>
                </View>
              </View>
              {passwordErrorMsg ? <Text style={styles.errorText}>{passwordErrorMsg}</Text> : null}
            </View>
          </View>
          <ValidatedInput
            label={"Confirmar Contraseña*"}
            icon="lock"
            placeholder="Repetir contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmPasswordErrorMsg) setConfirmPasswordErrorMsg("");
            }}
            onBlur={validateConfirmPassword}
            errorMsg={confirmPasswordErrorMsg}
          />
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

        <Button
          title="Continuar"
          onPress={() => {
            if (validateForm()) {
              navigation.navigate("VerificationScreen");
            }
          }}
          buttonStyle={{ width: "100%" }}
          icon={<Feather name="send" size={20} color="#fff" />}
        />

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
  eyeButton: {
    paddingEnd: 10,
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
  inputIcon: {
    marginRight: 10,
    marginTop: 10
  },
  termsText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "montserrat-semibold",
  },
  link: {
    textDecorationLine: "underline",
    color: "#4A73DA",
    fontFamily: "montserrat-bold"
  },
  svgContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 45,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center", // Centrado vertical
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BEBEBE",
    borderRadius: 5,
    paddingHorizontal: 7,
  },
  input: {
    flex: 1,
    height: 45,
    fontFamily: "montserrat-regular",
    color: "#000",
    fontSize: 16,
  },
  inputContainerFather: {
    marginBottom: 10,
  },
});

export default SingUpScreen;

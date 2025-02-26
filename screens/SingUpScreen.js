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
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");

  // Estados para manejar los errores de validación
  const [correoErrorMsg, setCorreoErrorMsg] = useState(false);
  const [nombreErrorMsg, setNombreErrorMsg] = useState(false);
  const [celularErrorMsg, setCelularErrorMsg] = useState(false);

  // Validación al perder el foco de cada campo
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setCorreoErrorMsg("Ingresa un correo válido");
    } else {
      setCorreoErrorMsg("");
    }
  };

  const validateNombre = () => {
    if (nombre.trim() === "") {
      setNombreErrorMsg("El nombre es obligatorio");
    } else {
      setNombreErrorMsg("");
    }
  };

  const validateCelular = () => {
    if (celular.trim().length < 10) {
      setCelularErrorMsg("El número de celular debe tener al menos 10 dígitos");
    } else {
      setCelularErrorMsg("");
    }
  };

  // Validación global del formulario al presionar el botón
  const validateForm = () => {
    validateEmail();
    validateNombre();
    validateCelular();
    // Verificamos que no existan mensajes de error
    return (
      correoErrorMsg === "" &&
      nombreErrorMsg === "" &&
      celularErrorMsg === "" &&
      correo &&
      nombre &&
      celular
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SingUpScreen")}
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

          {/* Campo Nombre */}
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#BEBEBE" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, nombreErrorMsg && { borderColor: "red" }]}
              placeholder="Ingresar nombre*"
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                if (nombreErrorMsg) setNombreErrorMsg("");
              }}
              onBlur={validateNombre}
              placeholderTextColor="#999"
            />
          </View>
          {nombreErrorMsg ? <Text style={styles.errorText}>{nombreErrorMsg}</Text> : null}

          {/* Campo Celular */}
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
              navigation.navigate("LoginScreen");
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
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
    marginBottom: 5,
  },
});

export default SingUpScreen;

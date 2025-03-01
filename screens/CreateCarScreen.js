import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

const optIcon = require("../assets/img/car_image.jpg");

const FormularioVehiculo = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    tipo: "",
  });

  const [errors, setErrors] = useState({
    placa: "",
    marca: "",
    tipo: "",
  });

  const validarPlaca = (placa) => /^[A-Za-z]{3}[0-9]{3}$/.test(placa);

  const handleChange = (name, value) => {
    const newValue = name === "placa" ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: newValue });
    let newErrors = { ...errors };

    if (name === "placa") {
      newErrors.placa = validarPlaca(newValue) ? "" : "Formato incorrecto (Ej: ABC123)";
    }
    if ((name === "marca" || name === "tipo") && newValue.trim() === "") {
      newErrors[name] = "Este campo es obligatorio";
    } else {
      newErrors[name] = "";
    }
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    let validationErrors = {};
    if (!validarPlaca(formData.placa)) {
      validationErrors.placa = "Formato incorrecto (Ej: ABC123)";
    }
    if (!formData.marca.trim()) {
      validationErrors.marca = "Este campo es obligatorio";
    }
    if (!formData.tipo.trim()) {
      validationErrors.tipo = "Este campo es obligatorio";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <BackButton />

      {/* Contenedor de la imagen centrada */}
      <View style={styles.imageContainer}>
        <Image source={optIcon} style={styles.image} />
      </View>

      <Text style={styles.title}>Registrar vehículo</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="car-outline" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ingresar placa*"
          value={formData.placa}
          onChangeText={(value) => handleChange("placa", value.toUpperCase())}
          maxLength={6}
          autoCapitalize="characters"
        />
      </View>
      {errors.placa ? <Text style={styles.error}>{errors.placa}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons name="pricetag-outline" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ingresar marca*"
          value={formData.marca}
          onChangeText={(value) => handleChange("marca", value)}
        />
      </View>
      {errors.marca ? <Text style={styles.error}>{errors.marca}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons name="car-outline" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ingresar tipo de vehículo*"
          value={formData.tipo}
          onChangeText={(value) => handleChange("tipo", value)}
        />
      </View>
      {errors.tipo ? <Text style={styles.error}>{errors.tipo}</Text> : null}
      <Button
          title="Agregar"
          buttonStyle={{ width: "100%" }}
          icon={<Feather name="send" size={20} color="#fff" />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  image: {
      width: 350,
      height: 350,
      marginBottom: 20,
  },
  title: {
      fontSize: 32,
      fontFamily: "montserrat-bold",
      color: "#005C53",
      alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0D3B2E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FormularioVehiculo;

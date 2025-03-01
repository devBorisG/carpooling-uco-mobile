import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import ValidatedInput from "../components/ValidatedInput";

const optIcon = require("../assets/img/car_image.jpg");

const FormularioVehiculo = () => {
  const navigation = useNavigation();
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [placaErrorMsg, setPlacaErrorMsg] = useState("");
  const [marcaErrorMsg, setMarcaErrorMsg] = useState("");
  const [tipoErrorMsg, setTipoErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePlaca = () => {
    if (placa.length !== 6) {
      setPlacaErrorMsg("La placa debe tener 6 caracteres");
    } else {
      setPlacaErrorMsg("");
    }
  };

  const validateEmptyOrNull = (value) => {
    return value.trim() === "" ? "Este campo es obligatorio" : "";
  };

  useEffect(() => {
    if (placaErrorMsg === "" && marcaErrorMsg === "" && tipoErrorMsg === "" && placa && marca && tipo) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [placaErrorMsg, marcaErrorMsg, tipoErrorMsg, placa, marca, tipo]);

  const validateForm = () => {
    validatePlaca();
    setMarcaErrorMsg(validateEmptyOrNull(marca));
    setTipoErrorMsg(validateEmptyOrNull(tipo));
    return isValid;
  };

  return (
    <View style={styles.container}>
      <BackButton icon={<AntDesign name="arrowleft" size={24} color="#005C53" />} />
      <View style={styles.imageContainer}>
        <Image source={optIcon} style={styles.image} />
      </View>
      <Text style={styles.title}>Registrar vehículo</Text>
      <ValidatedInput
        label="Placa del vehículo*"
        placeholder="ABC123"
        icon={<Ionicons name="car-outline" size={25} color="#777" />}
        value={placa}
        onChangeText={(text) => {
          setPlaca(text);
          setPlacaErrorMsg("");
        }}
        onBlur={validatePlaca}
        errorMessage={placaErrorMsg}
        style={[styles.input, placaErrorMsg ? styles.inputError : null]}
      />
      <ValidatedInput
        label="Marca del vehículo*"
        placeholder="Toyota"
        icon={<Ionicons name="pricetag-outline" size={25} color="#777" />}
        value={marca}
        onChangeText={(text) => {
          setMarca(text);
          setMarcaErrorMsg("");
        }}
        errorMessage={marcaErrorMsg}
        style={[styles.input, marcaErrorMsg ? styles.inputError : null]}
      />
      <ValidatedInput
        label="Tipo de vehículo*"
        placeholder="Sedán, SUV, Camioneta"
        icon={<Ionicons name="car-outline" size={25} color="#777" />}
        value={tipo}
        onChangeText={(text) => {
          setTipo(text);
          setTipoErrorMsg("");
        }}
        errorMessage={tipoErrorMsg}
        style={[styles.input, tipoErrorMsg ? styles.inputError : null]}
      />
      <Button
        title="Agregar"
        buttonStyle={{ width: "100%" }}
        icon={<Feather name="send" size={20} color="#fff" />}
        onPress={() => {
          if (validateForm()) {
            navigation.navigate("HomeScreen");
          }
        }}
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
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: "montserrat-bold",
    color: "#005C53",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputError: {
    borderColor: "red",
    backgroundColor: "#FFE5E5",
  },
});

export default FormularioVehiculo;
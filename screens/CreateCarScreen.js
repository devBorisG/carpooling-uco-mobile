import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { isValidPlaca } from "../utils/validation";
import ValidatedInput from "../components/ValidatedInput";

const optIcon = require("../assets/img/carImage.jpg");

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
    if (placa.trim() === "") {
      setPlacaErrorMsg("Este campo es obligatorio");
    } else if (placa.length !== 6) {
      setPlacaErrorMsg("La placa debe tener 6 caracteres");
    } else if (!isValidPlaca(placa)) {
      setPlacaErrorMsg("La placa no es válida");
    } else {
      setPlacaErrorMsg("");
    }
  };

  const validateEmptyField = (value, setError) => {
    if (value.trim() === "") {
      setError("Este campo es obligatorio");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (
      placaErrorMsg === "" &&
      marcaErrorMsg === "" &&
      tipoErrorMsg === "" &&
      placa &&
      marca &&
      tipo
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [placaErrorMsg, marcaErrorMsg, tipoErrorMsg, placa, marca, tipo]);

  const handleSubmit = () => {
    validatePlaca();
    validateEmptyField(marca, setMarcaErrorMsg);
    validateEmptyField(tipo, setTipoErrorMsg);
    if (isValid) {
      navigation.navigate("CreateRouteScreen");
    }
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
        icon={<Ionicons name="car-outline" size={20} color="#777" />}
        value={placa}
        onChangeText={(text) => {
          setPlaca(text);
          setPlacaErrorMsg("");
        }}
        onBlur={validatePlaca}
        errorMsg={placaErrorMsg}
      />
      <ValidatedInput
        label="Marca del vehículo*"
        placeholder="Toyota"
        icon={<Ionicons name="pricetag-outline" size={20} color="#777" />}
        value={marca}
        onChangeText={(text) => {
          setMarca(text);
          setMarcaErrorMsg("");
        }}
        onBlur={() => validateEmptyField(marca, setMarcaErrorMsg)}
        errorMsg={marcaErrorMsg}
      />
      <ValidatedInput
        label="Tipo de vehículo*"
        placeholder="Sedán, SUV, Camioneta"
        icon={<Ionicons name="car-outline" size={20} color="#777" />}
        value={tipo}
        onChangeText={(text) => {
          setTipo(text);
          setTipoErrorMsg("");
        }}
        onBlur={() => validateEmptyField(tipo, setTipoErrorMsg)}
        errorMsg={tipoErrorMsg}
      />
      <Button
        title="Agregar"
        buttonStyle={{ width: "100%" }}
        icon={<Feather name="send" size={20} color="#fff" />}
        onPress={handleSubmit}
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
    fontSize: 38,
    fontFamily: "montserrat-bold",
    color: "#005C53",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
});

export default FormularioVehiculo;
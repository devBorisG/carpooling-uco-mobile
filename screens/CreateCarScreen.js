import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
    if (!marca) setMarcaErrorMsg("Debe seleccionar una marca");
    if (!tipo) setTipoErrorMsg("Debe seleccionar un tipo de vehículo");

    if (placa && marca && tipo && placaErrorMsg === "" && marcaErrorMsg === "" && tipoErrorMsg === "") {
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
        icon={<MaterialCommunityIcons name="card-outline" size={25} color="#777" />}
        value={placa}
        onChangeText={(text) => {
          setPlaca(text);
          setPlacaErrorMsg("");
        }}
        onBlur={validatePlaca}
        errorMsg={placaErrorMsg}
      />

      <Text style={styles.label}>Marca del vehículo*</Text>
      <View style={styles.pickerContainer}>
        <Ionicons name="list" size={25} color="#777" style={styles.pickerIcon} />
        <Picker
          selectedValue={marca}
          onValueChange={(itemValue) => {
            setMarca(itemValue);
            setMarcaErrorMsg("");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una marca" value="" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Nissan" value="Nissan" />
        </Picker>
      </View>
      {marcaErrorMsg ? <Text style={styles.errorText}>{marcaErrorMsg}</Text> : null}

      <Text style={styles.label}>Tipo de vehículo*</Text>
      <View style={styles.pickerContainer}>
        <Ionicons name="list" size={25} color="#777" style={styles.pickerIcon} />
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => {
            setTipo(itemValue);
            setTipoErrorMsg("");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un tipo" value="" />
          <Picker.Item label="Automóvil" value="Sedán" />
          <Picker.Item label="Bus" value="SUV" />
          <Picker.Item label="Camioneta" value="Camioneta" />
          <Picker.Item label="Motocicleta" value="Motocicleta" />
        </Picker>
      </View>
      {tipoErrorMsg ? <Text style={styles.errorText}>{tipoErrorMsg}</Text> : null}

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
  label: {
    fontSize: 16,
    color: "#005C53",
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerIcon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FormularioVehiculo;

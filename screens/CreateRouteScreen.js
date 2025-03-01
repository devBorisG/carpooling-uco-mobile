import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { Feather, Ionicons } from '@expo/vector-icons';
import ValidatedInput from "../components/ValidatedInput";
import Footer from "../components/Footer";

const CreateTripScreen = () => {
  const navigation = useNavigation();
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startPointError, setStartPointError] = useState("");
  const [endPointError, setEndPointError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmptyField = (value, setError) => {
    if (value.trim() === "") {
      setError("Este campo es obligatorio");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    validateEmptyField(startPoint, setStartPointError);
    validateEmptyField(endPoint, setEndPointError);
    if (startPoint !== "" && endPoint !== "") {
      setSuccessMessage("Ruta creada con éxito");
      navigation.navigate("HomeScreen");
    }
  };

  const handleSkip = () => {
    navigation.navigate("HomeScreen");
};

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Vamos a crear tu viaje</Text>
      <Text style={styles.subtitle}>Su dirección se mantiene privada.</Text>

      <ValidatedInput
        label="Punto de partida*"
        placeholder="Ingresar punto de partida"
        icon={<Ionicons name="location-outline" size={25} color="#888" />}
        value={startPoint}
        onChangeText={(text) => {
          setStartPoint(text);
          setStartPointError("");
        }}
        onBlur={() => validateEmptyField(startPoint, setStartPointError)}
        errorMsg={startPointError}
      />

      <ValidatedInput
        label="Punto de llegada*"
        placeholder="Ingresar punto de llegada"
        icon={<Ionicons name="location-outline" size={25} color="#888" />}
        value={endPoint}
        onChangeText={(text) => {
          setEndPoint(text);
          setEndPointError("");
        }}
        onBlur={() => validateEmptyField(endPoint, setEndPointError)}
        errorMsg={endPointError}
      />

      <Image source={require("../assets/img/map.jpg")} style={styles.image} />

      <Button 
        title="Crear Ruta" onPress={handleSubmit} 
        buttonStyle={{ width: "100%" }} 
        icon={<Feather name="send" size={20} color="#fff" />}
      />
      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>Saltar por ahora</Text>
      </TouchableOpacity>

      {successMessage ? <Text style={styles.successMsg}>{successMessage}</Text> : null}
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  backButtonContainer: {
    marginBottom: 10,
  },
  skipText: {
      fontSize: 22,
      fontFamily: "montserrat-bold",
      color: "#B2AFAF",
      textDecorationLine: "underline",
      textAlign: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#043927',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    alignSelf: 'center',
    marginBottom: 20,
  },
  successMsg: {
    color: "green",
    fontSize: 14,
    marginTop: 5,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    alignSelf: "center",
},
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default CreateTripScreen;
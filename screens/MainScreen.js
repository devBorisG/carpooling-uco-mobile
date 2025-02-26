/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App!</Text>
      <Text style={styles.content}>Aquí va el contenido principal de la aplicación.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontFamily: "montserrat-bold"
  },
  content: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
});

export default MainScreen;

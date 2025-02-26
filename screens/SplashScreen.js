/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const carIcon = require("../assets/img/Logo.jpg");

const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={carIcon} style={{ width: 300, height: 300 }} />
      <Text style={styles.title}>Carpooling</Text>
      <Text style={styles.title}>UCO</Text>
      <ActivityIndicator size="large" color="#00473B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2FEEF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: "#00473B",
    fontFamily: "montserrat-bold",
  },
});

export default SplashScreen;

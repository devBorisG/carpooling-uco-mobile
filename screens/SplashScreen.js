/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const carIcon = require("../assets/img/Logo.jpg");

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={carIcon} style={{ width: 300, height: 190 }} />
      <Text style={styles.title}>Carpooling</Text>
      <ActivityIndicator size="large" color="#00473B" style={{paddingTop:40}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2FEEF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 300,
    height: 190,
    resizeMode: "contain",
  },
  title: {
    fontSize: 58,
    color: "#00473B",
    fontFamily: "montserrat-bold",
    textAlign: "center",
    flexWrap: "nowrap",
    maxWidth: "90%",
  },
  loader: {
    paddingTop: 40,
  },
});
export default SplashScreen;

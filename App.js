import React, { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import MainScreen from "./screens/MainScreen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";

// Función para cargar las fuentes
const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Simula la carga de datos o la inicialización de la app
    const loadResources = async () => {
      // Aquí podrías realizar peticiones a APIs, cargar fuentes, etc.
      await fetchFonts();
      setFontLoaded(true);
      // eslint-disable-next-line no-undef
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    loadResources();
  }, []);

  if (!fontLoaded || isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <MainScreen />
      <StatusBar style="auto" />
    </>
  );
}

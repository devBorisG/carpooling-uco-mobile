/* eslint-disable prettier/prettier */
import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import SingUpScreen from "./screens/SingUpScreen";
import TermsScreen from "./screens/TermsScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import LoginScreen from "./screens/LoginScreen";
import VerificationScreen from "./screens/VerificationScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AllowLocationScreen from "./screens/AllowLocationScreen";
import HomeScreen from "./screens/HomeScreen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import CreateCarScreen from "./screens/CreateCarScreen";
import CreateRouteScreen from "./screens/CreateRouteScreen";

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      await fetchFonts();
      setFontLoaded(true);
      // Una vez que las fuentes están cargadas, se espera el tiempo de splash
      // eslint-disable-next-line no-undef
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    loadResources();
  }, []);

  // Mientras las fuentes no se hayan cargado, no renderizamos nada (o podemos renderizar un indicador básico)
  if (!fontLoaded) {
    return null;
  }

  // Una vez cargadas las fuentes, mostramos la SplashScreen durante el tiempo definido
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUpScreen"
          component={SingUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsScreen"
          component={TermsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyScreen"
          component={PrivacyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllowLocationScreen"
          component={AllowLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="ForgotPasswordScreen" 
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="SelectRoleScreen" 
        component={SelectRoleScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="CreateCarScreen"
        component={CreateCarScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="CreateRouteScreen"
        component={CreateRouteScreen}
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
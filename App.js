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
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

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
    const loadResources = async () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

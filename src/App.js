/* eslint-disable prettier/prettier */
import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';
import { toastConfig } from "../toastConfig";

// Servicios
import { loadFonts, delay } from "./utils/fontService";

// Constantes
import { SCREENS, TIMES } from "./utils/constants";

// Pantallas
import SplashScreen from "./screens/SplashScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TermsScreen from "./screens/TermsScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import LoginScreen from "./screens/LoginScreen";
import VerificationScreen from "./screens/VerificationScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AllowLocationScreen from "./screens/AllowLocationScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import CreateCarScreen from "./screens/CreateCarScreen";
import CreateRouteScreen from "./screens/CreateRouteScreen";
import BookingScreen from "./screens/BookingScreen";
import SimilarRoutesScreen from "./screens/SimilarRoutesScreen";
import RatingScreen from "./screens/RatingScreen";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Carga de fuentes
        const fontsLoaded = await loadFonts();
        setFontLoaded(fontsLoaded);

        // Espera el tiempo de splash
        await delay(TIMES.SPLASH_DURATION);

        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar recursos:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Mientras las fuentes no se hayan cargado, no renderizamos nada
  if (!fontLoaded) {
    return null;
  }

  // Una vez cargadas las fuentes, mostramos la SplashScreen durante el tiempo definido
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.ONBOARDING}>
        {/* Pantallas principales */}
        <Stack.Screen
          name={SCREENS.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Pantallas de autenticación */}
        <Stack.Screen
          name={SCREENS.SIGNUP}
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.LOGIN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.VERIFICATION}
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        {/* Pantallas de onboarding */}
        <Stack.Screen
          name={SCREENS.ONBOARDING}
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.SELECT_ROLE}
          component={SelectRoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.ALLOW_LOCATION}
          component={AllowLocationScreen}
          options={{ headerShown: false }}
        />

        {/* Pantallas de funcionalidad */}
        <Stack.Screen
          name={SCREENS.BOOKING}
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.SIMILAR_ROUTES}
          component={SimilarRoutesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.CREATE_CAR}
          component={CreateCarScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.CREATE_ROUTE}
          component={CreateRouteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.RATING}
          component={RatingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.RIDE_IN_PROGRESS}
          component={RideInProgressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.CHAT}
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        {/* Pantallas legales */}
        <Stack.Screen
          name={SCREENS.TERMS}
          component={TermsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.PRIVACY}
          component={PrivacyScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
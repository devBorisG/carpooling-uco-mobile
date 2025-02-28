/* eslint-disable */
import React, { useRef, useEffect, useState, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");
const sidebarWidth = width * 0.8;

const optionsList = [
  "Perfil",
  "Historial de viajes",
  "Sobre",
  "Ayuda",
  "Cerrar sesión",
];

const Sidebar = ({ visible, onClose, onOptionPress }) => {
  const [shouldRender, setShouldRender] = useState(visible);
  // Inicialmente fuera de la pantalla a la izquierda: -sidebarWidth
  const slideAnim = useRef(new Animated.Value(visible ? 0 : -sidebarWidth)).current;
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -sidebarWidth,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!shouldRender) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <BlurView intensity={0} style={styles.overlay}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.sidebar, { left: slideAnim, opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.userSection}>
              <Image
                source={require("../assets/img/jarodsito.png")}
                style={styles.userImage}
              />
              <Text style={styles.username}>Jarodsito</Text>
              <Text style={styles.email}>jarod***@gmail.com</Text>
            </View>
            <View style={styles.options}>
              {optionsList.map((option, index) => (
                <Fragment key={option}>
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => onOptionPress(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                  {index < optionsList.length - 1 && <View style={styles.divider} />}
                </Fragment>
              ))}
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 60,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: sidebarWidth,
    backgroundColor: "rgba(226,254,239, 1)",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  userSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "montserrat-bold",
    color: "#042940",
  },
  email: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "#042940",
  },
  options: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  optionItem: {
    paddingVertical: 15,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "montserrat-semibold",
    color: "#042940",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
  },
});

export default Sidebar;

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
import { COLORS, FONTS, SIDEBAR_OPTIONS, TIMES } from "../../utils/constants";

const { width } = Dimensions.get("window");
const sidebarWidth = width * 0.8;

/**
 * Componente Sidebar para el menú lateral
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.visible - Indica si el sidebar está visible
 * @param {Function} props.onClose - Función para cerrar el sidebar
 * @param {Function} props.onOptionPress - Función para manejar el clic en una opción
 * @returns {JSX.Element|null} Componente Sidebar
 */
const Sidebar = ({ visible, onClose, onOptionPress }) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const slideAnim = useRef(new Animated.Value(visible ? 0 : -sidebarWidth)).current;
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: TIMES.ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: TIMES.ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -sidebarWidth,
          duration: TIMES.ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: TIMES.ANIMATION_DURATION,
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
              <Ionicons name="close" size={30} color={COLORS.BLACK} />
            </TouchableOpacity>

            <UserSection />

            <OptionsList options={SIDEBAR_OPTIONS} onOptionPress={onOptionPress} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  );
};

/**
 * Componente para la sección de usuario en el sidebar
 * @returns {JSX.Element} Componente UserSection
 */
const UserSection = () => (
  <View style={styles.userSection}>
    <Image
      source={require("../../../assets/img/jarodsito.png")}
      style={styles.userImage}
    />
    <Text style={styles.username}>Jarodsito</Text>
    <Text style={styles.email}>jarod***@gmail.com</Text>
  </View>
);

/**
 * Componente para la lista de opciones en el sidebar
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.options - Lista de opciones
 * @param {Function} props.onOptionPress - Función para manejar el clic en una opción
 * @returns {JSX.Element} Componente OptionsList
 */
const OptionsList = ({ options, onOptionPress }) => (
  <View style={styles.options}>
    {options.map((option, index) => (
      <Fragment key={option}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => onOptionPress(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
        {index < options.length - 1 && <View style={styles.divider} />}
      </Fragment>
    ))}
  </View>
);

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
    backgroundColor: COLORS.BACKGROUND,
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
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
  },
  email: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY,
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
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    width: "100%",
  },
});

export default Sidebar;

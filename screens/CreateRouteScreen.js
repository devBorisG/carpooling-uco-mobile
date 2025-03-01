import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackButton from "../components/BackButton";

const CreateTripScreen = () => {
  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.title}>Vamos a crear {"\n"}tu viaje</Text>
      <Text style={styles.subtitle}>Su dirección se mantiene privada.</Text>

      {/* Campos de entrada */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#888" />
        <TextInput placeholder="Punto de partida" style={styles.input} />
        <Ionicons name="options-outline" size={20} color="#888" />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#888" />
        <TextInput placeholder="Punto de llegada" style={styles.input} />
        <Ionicons name="options-outline" size={20} color="#888" />
      </View>

      {/* Imagen */}
      <Image source={require('./assets/map.png')} style={styles.image} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home" size={24} color="#043927" />
          <Text style={styles.footerText}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="car-outline" size={24} color="#888" />
          <Text style={styles.footerTextInactive}>VIAJE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#888" />
          <Text style={styles.footerTextInactive}>MENSAJE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="menu-outline" size={24} color="#888" />
          <Text style={styles.footerTextInactive}>MENU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#043927',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#043927',
  },
  footerTextInactive: {
    fontSize: 12,
    color: '#888',
  },
});

export default CreateTripScreen;

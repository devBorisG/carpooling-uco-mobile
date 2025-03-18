import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const SimilarRoutesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { origin, destination, seats, pickupTime } = route.params;

  // Datos de ejemplo - En una implementación real, estos datos vendrían de una API
  const similarRoutes = [
    {
      id: '1',
      driver: 'Carlos Pérez',
      origin: origin,
      destination: destination,
      time: '7:30 AM',
      seats: 3,
      price: 'COP 5,000',
      rating: 4.8,
    },
    {
      id: '2',
      driver: 'Ana María López',
      origin: origin,
      destination: destination,
      time: '8:00 AM',
      seats: 2,
      price: 'COP 4,500',
      rating: 4.5,
    },
    {
      id: '3',
      driver: 'Juan Rodríguez',
      origin: origin,
      destination: destination,
      time: '8:30 AM',
      seats: 4,
      price: 'COP 5,500',
      rating: 4.7,
    },
  ];

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => navigation.navigate('RouteDetail', { route: item })}
    >
      <View style={styles.driverInfo}>
        <Ionicons name="person-circle-outline" size={40} color="#00473B" />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{item.driver}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routeDetail}>
          <Ionicons name="time-outline" size={20} color="#00473B" />
          <Text style={styles.routeText}>{item.time}</Text>
        </View>
        <View style={styles.routeDetail}>
          <Ionicons name="people-outline" size={20} color="#00473B" />
          <Text style={styles.routeText}>{item.seats} cupos</Text>
        </View>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Rutas Disponibles</Text>
      
      <View style={styles.routeHeader}>
        <View style={styles.routePoints}>
          <Text style={styles.routePointText}>De: {origin}</Text>
          <Text style={styles.routePointText}>A: {destination}</Text>
        </View>
        <Text style={styles.routeTime}>Hora: {pickupTime}</Text>
      </View>

      <FlatList
        data={similarRoutes}
        renderItem={renderRouteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    marginTop: 10,
  },
  routeHeader: {
    backgroundColor: '#EDEDED',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  routePoints: {
    gap: 10,
    marginBottom: 10,
  },
  routePointText: {
    fontSize: 16,
    color: '#00473B',
    fontWeight: '500',
  },
  routeTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 20,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  driverDetails: {
    marginLeft: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  routeText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00473B',
  },
});

export default SimilarRoutesScreen; 
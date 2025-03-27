import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SCREENS } from '../utils/constants';

const SimilarRoutesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { origin, destination, seats, pickupTime } = route.params;

  // Datos de ejemplo - En una implementación real, estos datos vendrían de una API
  const similarRoutes = [
    {
      id: '1',
      driver: 'Jarod',
      origin: origin,
      destination: destination,
      time: '7:30 AM',
      seats: 3,
      price: 5000,
      rating: 4.8,
      tripInfo: {
        estimatedTime: 15,
        distance: 5.2,
        price: 5000,
        availableSeats: 3
      }
    },
    {
      id: '2',
      driver: 'Rafa',
      origin: origin,
      destination: destination,
      time: '12:00 PM',
      seats: 2,
      price: 4500,
      rating: 4.5,
      tripInfo: {
        estimatedTime: 18,
        distance: 6.3,
        price: 4500,
        availableSeats: 2
      }
    },
    {
      id: '3',
      driver: 'Luchito',
      origin: origin,
      destination: destination,
      time: '10:30 PM',
      seats: 4,
      price: 5500,
      rating: 4.7,
      tripInfo: {
        estimatedTime: 12,
        distance: 4.8,
        price: 5500,
        availableSeats: 4
      }
    },
  ];

  // Función para generar coordenadas de ruta (similar a la de HomeScreen)
  const generateRoute = (start, end) => {
    // Crear puntos de inicio y fin usando valores ficticios pero coherentes
    const startPoint = {
      latitude: 6.150700772035866,
      longitude:  -75.36645236474047
    };
    
    const endPoint = {
      latitude: 6.114438575418338,
      longitude: -75.41831161328865
    };
    
    // Generar puntos intermedios para simular una ruta
    const numPoints = 8;
    const points = [];

    // Añadir punto de inicio
    points.push(startPoint);

    // Generar puntos intermedios con cierta variación para simular calles
    for (let i = 1; i < numPoints; i++) {
      const fraction = i / numPoints;

      // Interpolación lineal con algo de variación aleatoria
      const latitude = startPoint.latitude + (endPoint.latitude - startPoint.latitude) * fraction + (Math.random() * 0.005 - 0.0025);
      const longitude = startPoint.longitude + (endPoint.longitude - startPoint.longitude) * fraction + (Math.random() * 0.005 - 0.0025);

      points.push({ latitude, longitude });
    }

    // Añadir punto final
    points.push(endPoint);

    return points;
  };

  // Manejar selección de una ruta
  const handleRouteSelection = (item) => {
    // Generar coordenadas de ruta simuladas
    const routeCoordinates = generateRoute();
    
    // Crear objeto de carro seleccionado en formato compatible con RideInProgressScreen
    const selectedCar = {
      id: item.id,
      name: item.driver,
      destination: {
        latitude: routeCoordinates[routeCoordinates.length - 1].latitude,
        longitude: routeCoordinates[routeCoordinates.length - 1].longitude,
        name: item.destination
      },
      tripInfo: {
        estimatedTime: item.tripInfo.estimatedTime,
        distance: item.tripInfo.distance,
        price: item.tripInfo.price,
        availableSeats: item.tripInfo.availableSeats
      }
    };
    
    // Navegar a la pantalla de viaje en progreso con los datos necesarios
    navigation.navigate(SCREENS.RIDE_IN_PROGRESS, {
      selectedCar,
      routeCoordinates
    });
  };

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => handleRouteSelection(item)}
    >
      <View style={styles.driverInfo}>
        <Ionicons name="person-circle-outline" size={40} color={COLORS.PRIMARY} />
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{item.driver}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={COLORS.STAR} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routeDetail}>
          <Ionicons name="time-outline" size={20} color={COLORS.PRIMARY} />
          <Text style={styles.routeText}>{item.time}</Text>
        </View>
        <View style={styles.routeDetail}>
          <Ionicons name="people-outline" size={20} color={COLORS.PRIMARY} />
          <Text style={styles.routeText}>{item.seats} cupos</Text>
        </View>
        <Text style={styles.priceText}>${item.price}</Text>
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
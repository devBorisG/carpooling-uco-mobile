import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SCREENS, SIZES } from '../utils/constants';

const SimilarRoutesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { origin, destination, seats, pickupTime } = route.params;

  // Datos de ejemplo - En una implementación real, estos datos vendrían de una API
  const similarRoutes = [
    {
      id: '1',
      driver: 'Jarod Herrera',
      driverLicense: 'DL 5C AB 1234',
      driverImage: require('../../assets/img/jarodsito.png'),
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
      driverLicense: 'DL 7F CD 5678',
      driverImage: require('../../assets/img/rafa.jpg'),
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
      driver: 'James',
      driverLicense: 'DL 3B EF 9012',
      driverImage: require('../../assets/img/james.jpg'),
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
    const UCO_COORDINATES = {
      latitude: 6.150700772035866,
      longitude: -75.36645236474047,
      name: "Universidad Católica de Oriente"
    };
    
    // Destinos relevantes en Rionegro
    const RIONEGRO_DESTINATIONS = [
      { name: "Parque Principal", latitude: 6.15349, longitude: -75.37445 },
      { name: "Centro Comercial San Nicolás", latitude: 6.14852, longitude: -75.37666 },
      { name: "Hospital San Juan de Dios", latitude: 6.15607, longitude: -75.37255 },
      { name: "Terminal de Transportes", latitude: 6.15782, longitude: -75.37583 },
      { name: "Zona E", latitude: 6.16778, longitude: -75.36896 },
      { name: "Mall Complex Llanogrande", latitude: 6.16778, longitude: -75.39896 },
      { name: "Jardines de La Catedral", latitude: 6.15501, longitude: -75.37501 },
      { name: "Comfama Rionegro", latitude: 6.16459, longitude: -75.37376 }
    ];
  
    let startPoint, endPoint;
    
    // Determinar si el origen es la UCO o cerca de ella
    const isOriginUCO = origin === "Universidad Católica de Oriente" || 
                       (origin && origin.includes("UCO")) ||
                       Math.random() < 0.5; // 50% probabilidad para simulación
  
    if (isOriginUCO) {
      // Si el origen es la UCO, generar un destino aleatorio en Rionegro
      startPoint = {
        latitude: UCO_COORDINATES.latitude,
        longitude: UCO_COORDINATES.longitude
      };
      
      // Seleccionar un destino aleatorio
      const randomDestination = RIONEGRO_DESTINATIONS[Math.floor(Math.random() * RIONEGRO_DESTINATIONS.length)];
      endPoint = {
        latitude: randomDestination.latitude,
        longitude: randomDestination.longitude
      };
    } else {
      // Si el origen no es la UCO, la ruta será desde algún lugar hacia la UCO
      // Seleccionar un origen aleatorio
      const randomOrigin = RIONEGRO_DESTINATIONS[Math.floor(Math.random() * RIONEGRO_DESTINATIONS.length)];
      startPoint = {
        latitude: randomOrigin.latitude,
        longitude: randomOrigin.longitude
      };
      
      // El destino será la UCO
      endPoint = {
        latitude: UCO_COORDINATES.latitude,
        longitude: UCO_COORDINATES.longitude
      };
    }
    
    // Generar puntos intermedios para simular una ruta
    const numPoints = 8; // Número adecuado de puntos para rutas cortas
    const points = [];
  
    // Añadir punto de inicio
    points.push({...startPoint});
    // Generar puntos intermedios con variación para simular calles de Rionegro
    for (let i = 1; i < numPoints; i++) {
      const fraction = i / numPoints;
      // Factor de variación reducido para rutas más realistas
      const variationFactor = 0.0015; // Variación menor para calles urbanas
      
      const latitude = startPoint.latitude + 
                     (endPoint.latitude - startPoint.latitude) * fraction + 
                     (Math.random() * variationFactor - variationFactor/2);
      
      const longitude = startPoint.longitude + 
                       (endPoint.longitude - startPoint.longitude) * fraction + 
                       (Math.random() * variationFactor - variationFactor/2);
  
      points.push({ latitude, longitude });
    }
    // Añadir punto final
    points.push({...endPoint});
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
      fullName: item.driverFullName,
      license: item.driverLicense,
      driverImage: item.driverImage,
      origin: {
        name: item.origin
      },
      destination: {
        latitude: routeCoordinates[routeCoordinates.length - 1].latitude,
        longitude: routeCoordinates[routeCoordinates.length - 1].longitude,
        name: item.destination || "Universidad Católica de Oriente"
      },
      rating: item.rating,
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
        <Ionicons name="arrow-back" size={28} color={COLORS.BLACK} />
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
    color: COLORS.PRIMARY,
    marginTop: SIZES.MARGIN_MEDIUM,
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
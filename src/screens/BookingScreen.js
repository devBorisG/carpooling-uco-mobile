/*eslint-disable*/
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList, ScrollView } from "react-native"
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../toastConfig';
import { SCREENS} from '../utils/constants';
// Componentes
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/SideBar";

const BookingScreen = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState("Universidad Católica de Oriente");
  const [destination, setDestination] = useState("");
  const [pickupTime, setPickupTime] = useState("Tiempo de ruta");
  const [seats, setSeats] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const weekDays = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miércoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' }
  ];

  const toggleDaySelection = (dayId) => {
    setSelectedDays(prevDays => 
      prevDays.includes(dayId)
        ? prevDays.filter(id => id !== dayId)
        : [...prevDays, dayId]
    );
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setTime(selectedDate);
      const hours = selectedDate.getHours() > 12 ? selectedDate.getHours() - 12 : selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const ampm = selectedDate.getHours() >= 12 ? "PM" : "AM";
      const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
      setSelectedTime(formattedTime);
    }
    setIsTimePickerVisible(false);
  };

  const handleSaveSchedule = () => {
    if (selectedDays.length > 0 && selectedTime) {
      setPickupTime(`${selectedTime} (${selectedDays.length} días)`);
      setSelectedTime(null);
      setSelectedDays([]);
      setShowDaySelector(false);
      toggleModal();
      
      // Mostrar toast de confirmación
      Toast.show({
        type: "success",
        position: "top",
        text1: "¡Ruta agendada!",
        text2: "Se ha agendado correctamente tu ruta",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 100,
        props: {
          style: {
            zIndex: 9999,
            position: 'absolute',
            top: 0,
            right: 0,
          }
        }
      });
    }
  };

  const handleUCOInputPress = () => {
    Toast.show({
      type: "success",
      text1: "Aviso",
      text2: "Carpooling UCO es de uso exclusivo para desplazamientos hacia y desde la universidad",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 100,
    });
  };

  const handleSwap = () => {
    const tempOrigin = origin;
    setOrigin(destination);
    setDestination(tempOrigin);
  };

  const handleIncreaseSeats = () => {
    if (seats >= 4) {
      Toast.show({
        type: "info",
        text1: "Límite de cupos",
        text2: "Carpooling UCO solo permite separar hasta 4 cupos",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 100,
      });
      return;
    }
    setSeats(seats + 1);
  };

  const [recentTrips, setRecentTrips] = useState([
    {
      id: 1,
      title: "Aeropuerto José María Cordova - Llanogrande",
      date: "Dec 27 - 4:44 AM",
      price: "COP 0",
      status: "Unfulfilled",
      icon: "leaf",
    },
    {
      id: 2,
      title: "Aeropuerto José María Cordova - Llanogrande",
      date: "Dec 27 - 4:24 AM",
      price: "COP 0",
      status: "Unfulfilled",
      icon: "leaf",
    },
    {
      id: 3,
      title: "Cra. 80 #40-73",
      date: "Mar 20 - 1:45 AM",
      price: "COP 8,900",
      status: "2 drivers",
      icon: "time",
    },
    {
      id: 4,
      title: "Aeropuerto José María Cordova - Llanogrande",
      date: "Dec 27 - 4:44 AM",
      price: "COP 0",
      status: "Unfulfilled",
      icon: "leaf",
    },
    {
      id: 5,
      title: "Aeropuerto José María Cordova - Llanogrande",
      date: "Dec 27 - 4:24 AM",
      price: "COP 0",
      status: "Unfulfilled",
      icon: "leaf",
    },
    {
      id: 6,
      title: "Cra. 80 #40-73",
      date: "Mar 20 - 1:45 AM",
      price: "COP 8,900",
      status: "2 drivers",
      icon: "time",
    },
  ]);

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>¿Hacia dónde vamos?</Text>

      {/* Contenedor principal */}
      <View style={styles.mainContainer}>
        {/* Contenedor de Origen y Destino */}
        <View style={styles.locationContainer}>
          {/* Columna de iconos */}
          <View style={styles.iconColumn}>
            <Ionicons name="school" size={22} color="#00473B" />
            <View style={styles.dottedLineContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.dot} />
              ))}
            </View>
            <Ionicons name="location" size={22} color="#00473B" />
          </View>

          {/* Contenedor de inputs alineados en columna */}
          <View style={styles.inputColumn}>
            <TextInput 
              style={styles.searchInput}
              value={origin} 
              onChangeText={(text) => {
                if (text !== "Universidad Católica de Oriente") {
                  setOrigin(text);
                }
              }}
              editable={origin !== "Universidad Católica de Oriente"}
              onPressIn={() => {
                if (origin === "Universidad Católica de Oriente") {
                  handleUCOInputPress();
                }
              }}
              placeholder="Origen" 
            />
            <View style={styles.divider} />
            <TextInput 
              style={styles.searchInput}
              value={destination} 
              onChangeText={(text) => {
                if (text !== "Universidad Católica de Oriente") {
                  setDestination(text);
                }
              }}
              editable={destination !== "Universidad Católica de Oriente"}
              onPressIn={() => {
                if (destination === "Universidad Católica de Oriente") {
                  handleUCOInputPress();
                }
              }}
              placeholder="Destino" 
            />
          </View>

          {/* Botón para intercambiar origen y destino */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Ionicons name="swap-vertical" size={24} color="#00473B" />
          </TouchableOpacity>
        </View>

        {/* Línea divisoria */}
        <View style={styles.horizontalDivider} />

        {/* Tiempo de Ruta */}
        <TouchableOpacity style={styles.timePicker} onPress={toggleModal}>
          <Ionicons name="time-outline" size={20} color="#00473B" />
          <Text style={styles.timeText}>{pickupTime}</Text>
        </TouchableOpacity>

        {/* Línea divisoria */}
        <View style={styles.horizontalDivider} />

        {/* Cupos */}
        <View style={styles.seatSelector}>
          <Ionicons name="people-outline" size={22} color="#00473B" />
          <Text style={styles.seatText}>¿Cuántos cupos necesitas?</Text>
          {seats > 1 && (
            <TouchableOpacity onPress={() => setSeats(seats - 1)}>
              <Ionicons name="remove-circle-outline" size={22} color="#00473B" />
            </TouchableOpacity>
          )}
          <Text style={styles.seatCount}>{seats}</Text>
          <TouchableOpacity onPress={handleIncreaseSeats}>
            <Ionicons 
              name="add-circle-outline" 
              size={22} 
              color={seats >= 4 ? "#999" : "#00473B"} 
            />
          </TouchableOpacity>
        </View>

{/* Cierra mainContainer justo antes del botón */}
</View>

{/* Botón Buscar Ruta fuera, pero pegado visualmente al mainContainer */}
<TouchableOpacity 
  style={styles.searchRouteButton}
  onPress={() => {
    if (!destination) {
      Toast.show({
        type: "info",
        text1: "Destino requerido",
        text2: "Por favor, ingresa un destino para buscar rutas",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 100,
      });
      return;
    }
    navigation.navigate(SCREENS.SIMILAR_ROUTES, {
      origin,
      destination,
      seats,
      pickupTime
    });
  }}
>
  <Text style={styles.searchRouteText}>Buscar Ruta</Text>
</TouchableOpacity>

      {/* Modal para seleccionar la hora */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>¿Cuándo necesitas la ruta?</Text>
            
            <TouchableOpacity onPress={() => { 
              setPickupTime("Ahora"); 
              setShowDaySelector(false);
              setSelectedTime(null);
              toggleModal(); 
            }} style={styles.optionButton}>
              <Ionicons name="time-outline" size={20} color="#00473B" />
              <Text style={styles.optionText}>Ahora</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setShowDaySelector(true);
              }} 
              style={styles.optionButton}
            >
              <Ionicons name="calendar-outline" size={20} color="#00473B" />
              <Text style={styles.optionText}>Agendar</Text>
            </TouchableOpacity>

            {showDaySelector && (
              <>
                <Text style={styles.sectionTitle}>¿Qué días de la semana?</Text>
                <View style={styles.daysContainer}>
                  {weekDays.map((day) => (
                    <TouchableOpacity
                      key={day.id}
                      onPress={() => toggleDaySelection(day.id)}
                      style={[
                        styles.dayButton,
                        selectedDays.includes(day.id) && styles.dayButtonSelected
                      ]}
                    >
                      <Text style={[
                        styles.dayButtonText,
                        selectedDays.includes(day.id) && styles.dayButtonTextSelected
                      ]}>
                        {day.name.substring(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>¿En qué horario?</Text>
                <TouchableOpacity 
                  style={styles.timePickerButton}
                  onPress={() => setIsTimePickerVisible(true)}
                >
                  <Ionicons name="time-outline" size={20} color="#00473B" />
                  <Text style={styles.timePickerButtonText}>
                    {selectedTime || "Seleccionar hora"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.saveButton,
                    (!selectedDays.length || !selectedTime) && styles.saveButtonDisabled
                  ]}
                  onPress={handleSaveSchedule}
                  disabled={!selectedDays.length || !selectedTime}
                >
                  <Text style={[
                    styles.saveButtonText,
                    (!selectedDays.length || !selectedTime) && styles.saveButtonTextDisabled
                  ]}>Guardar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Time Picker */}
      {isTimePickerVisible && (
        <DateTimePicker value={time} mode="time" is24Hour={false} display={Platform.OS === "ios" ? "spinner" : "default"} onChange={handleTimeChange} />
      )}

      <Footer
        onMenuPress={() => console.log("Menú presionado")}
        onHomePress={() => navigation.navigate("Home")}
        onChatPress={() => navigation.navigate(SCREENS.CHAT)}
        hasActiveTrip={true}
      />

      <Toast 
        config={toastConfig} 
        style={{
          zIndex: 9999,
          elevation: 10,
        }}
      />

<View style={styles.activityOuterContainer}>
  <Text style={styles.activityTitle}>Actividad</Text>

  <View style={styles.activityInnerContainer}>
    <FlatList
      data={recentTrips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tripCard}>
          <Ionicons
            name="car-outline" // Cambiado a icono de carro
            size={32}
            color="#00473B"
            style={styles.tripIcon}
          />
          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>{item.title}</Text>
            <Text style={styles.tripDate}>{item.date}</Text>
            <Text style={styles.tripDetails}>{item.price} • {item.status}</Text>
          </View>
          <TouchableOpacity style={styles.rebookButton}>
            <View style={styles.rebookContent}>
              <Ionicons name="repeat-outline" size={20} color="#00473B" />
              <Text style={styles.rebookText}>Re agendar</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  </View>
</View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingHorizontal: 20, paddingTop: 50 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#000" },

mainContainer: {
  backgroundColor: "#EDEDED",
  borderRadius: 15,
  padding: 15,
  marginBottom: 0, // ajusta para unir visualmente
},
  locationContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  iconColumn: { alignItems: "center", justifyContent: "center", marginLeft: 10 },
  dottedLineContainer: { height: 25, justifyContent: "space-between", alignItems: "center" },
  dot: { width: 2, height: 2, borderRadius: 2, backgroundColor: "#00473B" },

  inputColumn: { flex: 1, marginLeft: 8, alignItems: "center" },
  searchInput: { 
    fontSize: 16, 
    color: "#333", 
    textAlign: "center", 
    width: "90%"
  },
  divider: { height: 1, backgroundColor: "#CCC", width: "90%", marginVertical: 5 },

  swapButton: { marginLeft: 10 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },

  modalContainer: { 
    backgroundColor: "white", 
    borderRadius: 10, 
    padding: 20, 
    width: "80%", 
    alignItems: "center",
    maxHeight: '80%'
  },

  closeButton: { 
    position: "absolute", 
    top: 15, 
    right: 10,
    zIndex: 1
  },

  closeText: { fontSize: 16, color: "#00473B", fontWeight: "bold" },

  optionButton: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  optionText: { fontSize: 16, color: "#00473B", marginLeft: 8 },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",  // centra horizontalmente
    alignSelf: "center",       // centra el contenedor en el eje horizontal
    paddingVertical: 10,
  },
  timeText: { fontSize: 16, color: "#00473B", marginLeft: 8 },
  seatSelector: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12 },
  seatCount: { fontSize: 16, color: "#00473B", marginHorizontal: 8 },
searchRouteButton: {
  backgroundColor: "#00473B",
  paddingVertical: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  width: "100%", // mismo ancho del contenedor
  alignSelf: "center",
  alignItems: 'center',
  marginTop: -10, // clave para superponer ligeramente
  elevation: 5,   // para efecto elevado (Android)
  shadowColor: "#000", // sombra iOS
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
},

  searchRouteText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

activityOuterContainer: {
  backgroundColor: "#F9F9F9", // Antes era #FFF, ahora igual al fondo de la app
  borderRadius: 25,
  padding: 5,
  marginVertical: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 5,
  elevation: 0,
},


activityTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
  marginBottom: 10,
},

activityInnerContainer: {
  maxHeight: 360,  // Limita la altura para evitar que se extienda demasiado
  paddingBottom: 10,
},

tripCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F9F9F9",
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
},

tripIcon: {
  marginRight: 12,
},

tripInfo: {
  flex: 1,
},

tripTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
},

tripDate: {
  fontSize: 14,
  color: "#777",
},

tripDetails: {
  fontSize: 14,
  color: "#888",
},

rebookButton: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "#E0F0E5",
  borderRadius: 8,
  minWidth: 80,
},

rebookContent: {
  alignItems: 'center',
  justifyContent: 'center',
},

rebookText: {
  fontSize: 12,
  color: "#00473B",
  fontWeight: "bold",
  marginTop: 4,
},

daysContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: 15,
  width: '100%',
  gap: 10,
},

dayButton: {
  width: 45,
  height: 45,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F0F0F0',
  margin: 5,
},

dayButtonSelected: {
  backgroundColor: '#00473B',
},

dayButtonText: {
  fontSize: 14,
  color: '#333',
  fontWeight: '500',
},

dayButtonTextSelected: {
  color: '#FFFFFF',
},

selectedTimeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  padding: 10,
  backgroundColor: '#F0F0F0',
  borderRadius: 8,
},

selectedTimeText: {
  fontSize: 16,
  color: '#00473B',
  fontWeight: 'bold',
},

saveButton: {
  backgroundColor: '#00473B',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 25,
  marginBottom: 10,
  width: '100%',
  alignItems: 'center',
},

saveButtonDisabled: {
  backgroundColor: '#CCC',
},

saveButtonText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},

saveButtonTextDisabled: {
  color: '#777',
},

modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
  marginTop: 15,
  marginBottom: 20,
  alignSelf: 'center'
},

sectionTitle: {
  fontSize: 16,
  color: "#333",
  fontWeight: '500',
  alignSelf: 'flex-start',
  marginTop: 10,
  marginBottom: 5,
  marginLeft: 5
},

timePickerButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F0F0F0',
  padding: 10,
  borderRadius: 8,
  marginTop: 5,
},

timePickerButtonText: {
  fontSize: 16,
  color: '#00473B',
  marginLeft: 8,
},

toastContainer: {
  alignItems: 'flex-end',
  marginRight: 15
},
});

export default BookingScreen;
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState("Universidad Católica de Oriente");
  const [destination, setDestination] = useState("");
  const [pickupTime, setPickupTime] = useState("Tiempo de ruta");
  const [seats, setSeats] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [agendarOption, setAgendarOption] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isReminder, setIsReminder] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [time, setTime] = useState(new Date()); // Store the selected time

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleTimePickerModal = () => setIsTimePickerVisible(!isTimePickerVisible);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAgendarOption = (option) => {
    setAgendarOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === "Agendar" && selectedDays.length > 0 && selectedTime) {
      setPickupTime(`${selectedDays.join(", ")} - ${selectedTime}`);
      toggleModal();
    } else if (selectedOption === "Ahora") {
      setPickupTime("Ahora");
      toggleModal();
    }
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);  // Show the DateTimePicker modal
    setModalVisible(false);        // Close the main modal when Time Picker is shown
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
    const hours = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
    setSelectedTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`);
  };

  const closeTimePicker = () => {
    setIsTimePickerVisible(false); // Close the DateTimePicker modal when the close button is clicked
    setModalVisible(true); // Reopen the main modal after closing time picker
  };

  // Toggle day selection
  const toggleDaySelection = (day) => {
    setSelectedDays(prevState =>
      prevState.includes(day) ? prevState.filter(d => d !== day) : [...prevState, day]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>¿A Dónde Vamos?</Text>

      {/* Contenedor de Origen y Destino con Línea Conectada */}
      <View style={styles.locationContainer}>
        <View style={styles.iconColumn}>
          <Ionicons name="school" size={22} color="#00473B" />
          <View style={styles.dottedLineContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={styles.dot} />
            ))}
          </View>
          <Ionicons name="location" size={22} color="#00473B" />
        </View>

        <View style={styles.inputColumn}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.searchInput}
              value={origin}
              onChangeText={setOrigin}
              placeholder="Origen"
              placeholderTextColor="#666"
            />
          </View>

          {/* Línea Divisora más pequeña */}
          <View style={styles.divider} />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.searchInput}
              value={destination}
              onChangeText={setDestination}
              placeholder="Destino"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Botón de Intercambio alineado a la derecha de la línea divisora */}
        <TouchableOpacity onPress={() => {
          const temp = origin;
          setOrigin(destination);
          setDestination(temp);
        }} style={styles.swapButton}>
          <Ionicons name="swap-vertical" size={22} color="#00473B" />
        </TouchableOpacity>
      </View>

      {/* Sección de Hora de Recogida y Cupos en una sola fila */}
      <View style={styles.rowOptions}>
        <TouchableOpacity style={styles.timePicker} onPress={toggleModal}>
          <Ionicons name="time-outline" size={20} color="#00473B" />
          <Text style={styles.timeText}>{pickupTime}</Text>
        </TouchableOpacity>
        <View style={styles.seatSelector}>
          {/* Ícono de personas */}
          <Ionicons name="people-outline" size={22} color="#00473B" />

          {/* Condición para esconder el botón de decremento cuando los cupos sean 1 */}
          {seats > 1 && (
            <TouchableOpacity onPress={() => setSeats(seats - 1)}>
              <Ionicons name="remove-circle-outline" size={22} color="#00473B" />
            </TouchableOpacity>
          )}

          {/* Mostrar los cupos */}
          <Text style={styles.seatCount}>{seats}</Text>

          {/* Botón para sumar cupos */}
          <TouchableOpacity onPress={() => setSeats(seats + 1)}>
            <Ionicons name="add-circle-outline" size={22} color="#00473B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal principal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Botón Eliminar en la parte superior derecha */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Ionicons name="close-circle" size={28} color="#00473B" />
            </TouchableOpacity>

            {/* Título en el modal */}
            <Text style={styles.modalTitle}>¿Cuándo necesitas la ruta?</Text>

            {/* Opción Ahora */}
            <TouchableOpacity onPress={() => handleOptionSelect("Ahora")} style={styles.optionButton}>
              <Ionicons name="time-outline" size={20} color="#00473B" />
              <Text style={styles.optionText}>Ahora</Text>
              <Ionicons
                name={selectedOption === "Ahora" ? "radio-button-on" : "radio-button-off"}
                size={24}
                color="#00473B"
              />
            </TouchableOpacity>

            {/* Opción Agendar */}
            <TouchableOpacity onPress={() => handleOptionSelect("Agendar")} style={styles.optionButton}>
              <Ionicons name="calendar-outline" size={20} color="#00473B" />
              <Text style={styles.optionText}>Agendar</Text>
              <Ionicons
                name={selectedOption === "Agendar" ? "radio-button-on" : "radio-button-off"}
                size={24}
                color="#00473B"
              />
            </TouchableOpacity>

            {/* Si se seleccionó Agendar, mostrar las nuevas opciones */}
            {selectedOption === "Agendar" && (
              <View style={styles.agendarOptions}>
                <Text style={styles.subTitle}>Días a agendar:</Text>
                <View style={styles.daysContainer}>
                  {["L", "M", "X", "J", "V"].map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDay]}
                      onPress={() => toggleDaySelection(day)}
                    >
                      <Text style={styles.dayText}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.subTitle}>Selecciona un horario:</Text>
                <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
                  <Text style={styles.timeText}>{selectedTime || "Selecciona una hora"}</Text>
                </TouchableOpacity>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>Recordar</Text>
                  <Switch
                    value={isReminder}
                    onValueChange={setIsReminder}
                  />
                </View>
              </View>
            )}

            {/* Botón Continuar en la parte inferior */}
            <TouchableOpacity
              style={[styles.continueButton, !(selectedOption && selectedDays.length > 0 && selectedTime) && styles.disabledButton]}
              onPress={handleContinue}
              disabled={!(selectedOption && selectedDays.length > 0 && selectedTime)}
            >
              <Text style={styles.continueText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Time Picker */}
      <Modal
        visible={isTimePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeTimePicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.timePickerModalContainer}>
            <TouchableOpacity onPress={closeTimePicker} style={styles.closeButton}>
              <Ionicons name="close-circle" size={28} color="#00473B" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Selecciona una hora</Text>
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false} // Use 12-hour format
              display="spinner"
              onChange={handleTimeChange}
            />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingHorizontal: 20, paddingTop: 50 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#000" },
  locationContainer: { flexDirection: "row", backgroundColor: "#EDEDED", borderRadius: 15, padding: 12, alignItems: "center" },
  iconColumn: { alignItems: "center", justifyContent: "center", marginLeft: 10 },
  dottedLineContainer: { height: 25, justifyContent: "space-between", alignItems: "center" },
  dot: { width: 2, height: 2, borderRadius: 2, backgroundColor: "#00473B" },
  inputColumn: { flex: 1, marginLeft: 8 },
  inputRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "#333", marginLeft: 8 },
  divider: { height: 1, backgroundColor: "#CCC", width: "80%", alignSelf: "center", marginVertical: 3 },
  swapButton: { marginLeft: 10 },
  rowOptions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  timePicker: { flexDirection: "row", alignItems: "center" },
  timeText: { fontSize: 16, color: "#00473B", marginLeft: 8 },
  seatSelector: { flexDirection: "row", alignItems: "center" },
  seatCount: { fontSize: 16, color: "#00473B", marginHorizontal: 8 },

  // Modal Styles for main modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    width: "80%",
    alignItems: "center"
  },
  closeButton: { position: "absolute", top: 10, right: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#00473B" },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED"
  },
  optionText: { fontSize: 16, color: "#00473B" },
  agendarOptions: { marginTop: 20 },
  subTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  daysContainer: { flexDirection: "row", marginBottom: 20, justifyContent: "space-between" },
  dayButton: {
    borderWidth: 1,
    borderColor: "#00473B",
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
  selectedDay: { backgroundColor: "#00473B" },
  dayText: { color: "#00473B" },
  timeButton: {
    borderWidth: 1,
    borderColor: "#00473B",
    borderRadius: 5,
    padding: 12,
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  switchLabel: { fontSize: 16, color: "#00473B" },
  continueButton: {
    marginTop: 20,
    backgroundColor: "#00473B",
    borderRadius: 5,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center"
  },
  continueText: { fontSize: 16, color: "#FFF" },
  disabledButton: {
    backgroundColor: "#B0B0B0"
  },
  timePickerModalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    width: "80%",
    alignItems: "center",
  },
});

export default BookingScreen;

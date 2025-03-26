import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "../components/common/BackButton";
import { COLORS } from "../utils/constants";
import { SIZES } from "../utils/constants";
import { FONTS } from "../utils/constants";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <BackButton />
      <Text style={styles.headerTitle}>Historial de viajes</Text>
    </View>
  );
};

const recentTrips = [
  { id: 1, title: "Aeropuerto José María Cordova - Llanogrande", date: "Dec 27 - 4:44 AM", price: "COP 0", status: "Unfulfilled" },
  { id: 2, title: "Aeropuerto José María Cordova - Llanogrande", date: "Dec 27 - 4:24 AM", price: "COP 0", status: "Unfulfilled" },
  { id: 3, title: "Cra. 80 #40-73", date: "Mar 20 - 1:45 AM", price: "COP 8,900", status: "2 drivers" },
];

const ActivityList = () => {
  return (
    <FlatList
      data={recentTrips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tripCard}>
          <Ionicons name="car-outline" size={32} color="#00473B" style={styles.tripIcon} />
          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>{item.title}</Text>
            <Text style={styles.tripDate}>{item.date}</Text>
            <Text style={styles.tripDetails}>{item.price} • {item.status}</Text>
          </View>
          <TouchableOpacity style={styles.rebookButton}>
            <View style={styles.rebookContent}>
              <Ionicons name="repeat-outline" size={20} color="#00473B" />
              <Text style={styles.rebookText}>Re programar</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const DriverHistory = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.sectionTitle}>Actividad</Text>
      <ActivityList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: SIZES.PADDING_LARGE,
    justifyContent : "center",
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: SIZES.FONT_XLARGE,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  tripCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
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
  },
  tripDate: {
    fontSize: 14,
    color: "#666",
  },
  tripDetails: {
    fontSize: 14,
    color: "#666",
  },
  rebookButton: {
    backgroundColor: "#E0F2F1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  rebookContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rebookText: {
    marginLeft: 5,
    color: "#00473B",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default DriverHistory;

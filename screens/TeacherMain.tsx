import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TeacherMain = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sucbutton}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.errbutton}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#81ADC8",
    width: 302,
    height: 60,
    borderRadius: 5,
  },
  button: {
    fontSize: 12,
    backgroundColor: "#81ADC8",
    width: 150,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sucbutton: {
    fontSize: 12,
    backgroundColor: "#86d789",
    alignItems: "center",
    justifyContent: "center",
    width: 133,
    height: 42,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  errbutton: {
    fontSize: 12,
    backgroundColor: "#d36b54",
    alignItems: "center",
    justifyContent: "center",
    width: 133,
    height: 42,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16, // Adjust the font size as needed
    color: "#000", // Text color
    textAlign: "center",
  },
});

export default TeacherMain;

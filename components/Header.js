import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    paddingTop: 44,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#81ADC8",
    fontSize: 32,
    fontWeight: "700",
  },
});

export default Header;
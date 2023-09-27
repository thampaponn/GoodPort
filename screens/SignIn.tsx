import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";
// sadasdddd
const SignIn = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={{ alignItems: "center", fontSize: 24, fontWeight: "800" }}>
          Sign In
        </Text>
        <InputForm title={"username"} />
        <InputForm title={"password"} />
        <ButtonUi title={"Sign In"} />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}
        >
          <Text style={{ fontSize: 14 }}>don't have an account? </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14 }}>Sign Up</Text>
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
    justifyContent: "flex-end", 
    marginTop: 20,
    width: 300,
    maxWidth: 300,
  },

  textInput: {
    width: 307,
    height: 42,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
  },
  bigTextInput: {
    width: 307,
    height: 130,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
  },
});

export default SignIn;

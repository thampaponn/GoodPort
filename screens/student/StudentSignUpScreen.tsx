import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ButtonUi } from "../../components/ui/Button";
import { InputForm } from "../../components/ui/InputForm";

const StudSignUp = () => {
  const namearray = [
    {
      name: "อีเมล *"
    }, {
      name: "รหัสประจำตัวนักศึกษา *"
    }, {
      name: "รูปบัตรประจำตัวศึกษา *"
    }]
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.centeredContainer}>
          <Image
            style={{ marginBottom: 30 }}
            source={require('../assets/Logo.png')}
          />
          <Text style={styles.signUpText}>
            สมัครสมาชิก
          </Text>
        </View>
        {namearray.map((item, key) => <InputForm title={item.name} />)}
        <ButtonUi title={"สมัครสมาชิก"} />
        <View style={styles.flexContainer}>
          <Text style={styles.fontSm}>สมัครสมาชิกแล้ว? </Text>
          <TouchableOpacity>
            <Text style={styles.fontSm}>เข้าสู่ระบบ</Text>
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
    paddingBottom: 20,
    marginTop: 100,
    paddingLeft: 40,
    paddingRight: 40
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: 'center',
    paddingBottom: 50
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
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 20,
  },
  fontSm: {
    fontSize: 14
  }
});

export default StudSignUp;

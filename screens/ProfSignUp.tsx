import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";
import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useMemo, useState } from "react";


const ProfSignUp = () => {

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
        <InputForm title={"คำนำหน้าขื่อ *"} />
        <InputForm title={"อีเมล *"} />
        <InputForm title={"รหัสประจำตัวอาจารย์ *"} />
        <InputForm title={"มหาวิทยาลัยที่จบการศึกษา *"} />
        <InputForm title={"ประเทศที่จบการศึกษา"} />

        <ButtonUi title={"สมัครสมาชิก"} />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: 'center', paddingBottom: 50 }}
        >
          <Text style={{ fontSize: 14 }}>สมัครสมาชิกแล้ว? </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14 }}>เข้าสู่ระบบ</Text>
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
    // alignItems: "center",
    paddingBottom: 20,
    marginTop: 100,
    paddingLeft: 40,
    paddingRight: 40
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
    marginTop: 20, // Adjust the marginTop as needed
  },
});

export default ProfSignUp;

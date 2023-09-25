import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";
import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useMemo, useState } from "react";


const SignUp = () => {

  const radioButtons = useMemo(() => ([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'อาจารย์ (@KMITL)',
      value: 'professor'
    },
    {
      id: '2',
      label: 'นักเรียน (@KMITL)',
      value: 'student'
    },
    {
      id: '3',
      label: 'ผู้เยี่ยมชม',
      value: 'visitor'
    }

  ]), []);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.card}>
        <View style={styles.centeredContainer}>
          <Image
            style={{ marginBottom: 30 }}
            source={require('../assets/Logo.png')}
          />
          <Text style={styles.signUpText}>
            สมัครสมาชิก
          </Text>
        </View>
        {/* <View style={{ justifyContent: 'center', flexDirection: 'row'}}> */}
          <InputForm title={"ชื่อ *"} />
          <InputForm title={"นามสกุล *"} />
        {/* </View> */}
        <InputForm title={"ชื่อบัญชีผู้ใช้ *"} />
        <InputForm title={"เพศ *"} />
        <InputForm title={"รหัสผ่าน *"} />
        <InputForm title={"ยืนยันรหัสผ่าน *"} />
        <InputForm title={"หมายเลขโทรศัพท์ *"} />

        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout='column'
          containerStyle={{ alignItems: 'flex-start', marginTop: 20 }}
        />
        <ButtonUi title={"ถัดไป"} />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: 'center', paddingBottom: 50 }}
        >
          <Text style={{ fontSize: 14 }}>สมัครสมาชิกแล้ว? </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14 }}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default SignUp;

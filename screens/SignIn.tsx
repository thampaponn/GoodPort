import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";

const SignIn = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image
          style={{ marginBottom: 50 }}
          source={require("../assets/Logo.png")}
        />
        <Text
          style={{
            alignItems: "center",
            fontSize: 24,
            fontWeight: "800",
            marginBottom: 30,
          }}
        >
          เข้าสู่ระบบ
        </Text>
        <InputForm title={"ชื่อบัญชีผู้ใช้"} />
        <InputForm title={"รหัสผ่าน"} password={true} />
        <ButtonUi title={"เข้าสู่ระบบ"} />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}
        >
          <Text style={styles.fontSm}>ยังไม่มีบัญชีผู้ใช้ ? </Text>
          <TouchableOpacity>
            <Text style={styles.fontSm}> สมัครบัญชีผู้ใช้</Text>
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
  fontSm: {
    fontSize: 14,
  },
  card: {
    alignItems: "center",
    padding: 20,
    marginTop: 80,
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

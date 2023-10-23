import { Dialog } from "@rneui/themed";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { width } = useWindowDimensions();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Constants.expoConfig.extra.API_URL}/auth/signin`, {
        username,
        password,
      });
      const token = response.data.access_token;
      await AsyncStorage.setItem("token", token);
      navigation.navigate("main");
    } catch (error) {
      toggleModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ alignItems: "center", padding: 20, marginTop: 40 }}>
        <Dialog isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <Dialog.Title title="รหัสผ่านไม่ถูกต้อง" />
          <Text style={{}}>กรุณาลองใหม่อีกครั้ง</Text>
        </Dialog>
        <Dialog isVisible={isLoading}>
          <Dialog.Loading />
        </Dialog>

        <Image
          style={{
            marginTop: 20,
            marginBottom: 10,
            height: 66,
            width: width * 0.8,
          }}
          source={require("../../assets/Logo2.png")}
        />
        <Text
          style={{
            alignItems: "center",
            padding: 5,
            fontSize: 26,
            fontWeight: "800",
          }}
        >
          เข้าสู่ระบบ
        </Text>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 16,
              padding: 5,
            }}
          >
            {"ชื่อบัญชีผู้ใช้"}
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(data) => setUsername(data)}
            value={username}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 16 }}>{"รหัสผ่าน"}</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(data) => setPassword(data)}
            value={password}
          />
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            marginTop: 20,
            width: 300,
            maxWidth: 300,
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 42,
              justifyContent: "center",
              backgroundColor: "#81ADC8",
              width: "100%",
              height: 42,
              borderRadius: 10,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#FFFFFF",
                lineHeight: 30,
                textAlign: "center",
              }}
            >
              {"เข้าสู่ระบบ"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 23 }}
        >
          <Text
            style={{
              fontSize: 14,

              paddingVertical: 5,
            }}
          >
            ยังไม่มีบัญชีผู้ใช้ ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text
              style={{
                fontSize: 14,

                paddingVertical: 5,
              }}
            >
              {" "}
              สมัครบัญชีผู้ใช้
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 307,
    height: 42,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
    paddingHorizontal: 15,
  },
});

export default SignIn;

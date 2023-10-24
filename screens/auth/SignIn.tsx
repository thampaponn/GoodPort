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
  StatusBar
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
    <View style={{
      flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF"
    }}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Dialog isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <Dialog.Title title="รหัสผ่านไม่ถูกต้อง" />
          <Text style={{}}>กรุณาลองใหม่อีกครั้ง</Text>
        </Dialog>
        <Dialog isVisible={isLoading}>
          <Dialog.Loading />
        </Dialog>

        <Image
          style={{
            height: 150,
            width: width * 1,
            marginLeft: 20,
            marginTop: 40
          }}
          source={require("../../assets/Logo3.png")}
        />
        <Text
          style={{
            alignItems: "center",
            padding: 5,
            fontSize: 30,
            fontWeight: "800",
            marginBottom: 15,
            color: "#3444A8"
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
              backgroundColor: "#34448A",
              width: "100%",
              height: 45,
              borderRadius: 10,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                lineHeight: 30,
                textAlign: "center",
                fontWeight: "600"
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
                color: "#34448A",
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { ButtonUi } from "../../components/ui/Button";
import { InputForm } from "../../components/ui/InputForm";
import SelectDropdown from "react-native-select-dropdown";

const EditProfessorProfile = () => {
  const data = [
    "คำนำหน้าชื่อ",
    "ชื่อ *",
    "นามสกุล *",
    "เพศ",
    "อีเมล",
    "รหัสผ่าน *",
    "หมายเลขโทรศัพท์",
    "มหาวิทยาลัยที่จบการศึกษา",
    "ประเทศที่จบการศึกษา"
  ];
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.img}>
          <Image source={require("../../assets/placeholder.png")}></Image>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
        {data.map((name) =>
          name !== "รหัสผ่าน *" ? (
            <InputForm title={name} />
          ) : (
            <InputForm title={name} password={true} />
          )
        )}
        <ButtonUi title={"บันทึก"} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  img: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginRight: 60,
  },
  text: {
    color: "#F8F2DC",
    fontSize: 13,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#81ADC8",
    height: 30,
    width: 130,
    padding: 5,
    borderRadius: 20,
    marginLeft: 20,
  },
});

export default EditProfessorProfile;

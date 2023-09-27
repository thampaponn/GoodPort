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
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.img}>
          <Image source={require("../../assets/placeholder.png")}></Image>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
        </View>
        <InputForm title={"คำนำหน้าชื่อ"} />
        <InputForm title={"ชื่อ *"} />
        <InputForm title={"นามสกุล *"} />
        <InputForm title={"เพศ"} />
        <InputForm title={"อีเมล"} />
        <InputForm title={"รหัสผ่าน *"} password={true} />
        <InputForm title={"หมายเลขโทรศัพท์"} />
        <InputForm title={"มหาวิทยาลัยที่จบการศึกษา"} />
        <InputForm title={"ประเทศที่จบการศึกษา"} />
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

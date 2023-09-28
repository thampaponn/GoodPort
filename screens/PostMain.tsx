import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";

const PostMain = () => {
  return (
    <ScrollView>
    <View style={styles.screen}>
        <Image source={require('../assets/myProfile.png')} style={styles.img}/>
        <Text style={{marginTop: 15, fontSize: 16, color: "#0098DA"}}>ความสำเร็จอยู่ที่ไหน</Text>
        <Text style={{fontSize: 16, color: "#0098DA"}}>ความพยายามอยู่ที่นั่น</Text>
        <Text style={{marginTop: 10, fontSize: 13, marginRight: 150}}>ประเภทของโครงงาน : </Text>
        <TouchableOpacity style={styles.button}>
             <Text style={{color: "#FFFFFF", textAlign: "center", fontSize: 16,}}>Edit</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 15, fontSize: 16, marginRight: 160}}>ชื่อภาษาอังกฤษ : </Text>
        <Text style={{marginTop: 15, fontSize: 16, marginRight: 195}}>วัตถุประสงค์</Text>
        <TextInput style={styles.textInput}/>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 160}}>ที่มาของโครงงาน</Text>
        <TextInput style={styles.textInput}/>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 140}}>รายละเอียดโครงงาน</Text>
        <TextInput style={styles.textInput}/>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 185}}>รูปที่เกี่ยวข้อง</Text>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 175}}>ไฟล์ที่เกี่ยวข้อง</Text>
        <TextInput style={{width: 280, height: 45, borderColor: "#AEAEAE", borderWidth: 1, borderRadius: 8, marginTop: 5,}}/>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 165}}>อาจารย์ที่ปรึกษา</Text>
        <TextInput style={{width: 280, height: 45, borderColor: "#AEAEAE", borderWidth: 1, borderRadius: 8, marginTop: 5,}}/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    screen: {
        display: "flex",
        alignItems: "center",
        borderWidth: 1,
        width: 330,
        marginLeft: 30,
        marginTop: 30,
        borderColor: "#AEAEAE",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    img: {
        marginTop: 15,
    },
    button: {
        backgroundColor: "#81ADC8",
        height: 35,
        width: 110,
        padding: 5,
        borderRadius: 5,
        marginLeft:170,
        marginTop: 10,
        justifyContent: "center",
      },
      textInput: {
        width: 280,
        height: 80,
        borderColor: "#AEAEAE",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
      }
})
export default PostMain;
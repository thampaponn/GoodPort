import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";

const PostMain = () => {
  return (
    <ScrollView>
    <View style={styles.screen}>
        <Image source={require('../assets/myProfile.png')} style={styles.img}/>
        <Text style={{marginTop: 15, fontSize: 16, color: "#0098DA", fontWeight: "bold"}}>ความสำเร็จอยู่ที่ไหน</Text>
        <Text style={{fontSize: 16, color: "#0098DA", fontWeight: "bold"}}>ความพยายามอยู่ที่นั่น</Text>
        <Text style={{marginTop: 10, fontSize: 13, marginRight: 140, fontWeight: "bold"}}>ประเภทของโครงงาน : </Text>
        <TouchableOpacity style={styles.button}>
             <Text style={{color: "#FFFFFF", textAlign: "center", fontSize: 16,}}>Edit</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 15, fontSize: 16, marginRight: 145, fontWeight: "bold"}}>ชื่อภาษาอังกฤษ : </Text>
        <Text style={{marginTop: 15, fontSize: 16, marginRight: 185, fontWeight: "bold"}}>วัตถุประสงค์</Text>
        <View style={styles.views}>
            <Text>eieieieieieieiejcjdsklclksdvcieiei</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 150, fontWeight: "bold"}}>ที่มาของโครงงาน</Text>
        <View style={styles.views}>
            <Text>eieieieieieieisdnckvksdnkvskvksnvkdsnvdscjfsfnkerfgjkerngkeieiei</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 130, fontWeight: "bold"}}>รายละเอียดโครงงาน</Text>
        <View style={styles.views}>
            <Text>eieieieieieieieieiei</Text>
        </View>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 180, fontWeight: "bold"}}>รูปที่เกี่ยวข้อง</Text>
        <Image source={require("../assets/exOne.jpg")} style={styles.expic}/>
        <Image source={require("../assets/exTwo.jpg")} style={styles.expic}/>
        <Image source={require("../assets/exThree.jpg")} style={styles.expic}/>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 170, fontWeight: "bold"}}>ไฟล์ที่เกี่ยวข้อง</Text>
        <View style={styles.views2}></View>
        <Text style={{marginTop: 10, fontSize: 16, marginRight: 160, fontWeight: "bold"}}>อาจารย์ที่ปรึกษา</Text>
        <View style={styles.views2}></View>
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
        paddingBottom: 10,
        marginLeft: 30,
        marginTop: 30,
        marginBottom:30,
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
    },
    views: {
        borderWidth: 1,
        height: 80,
        width: 275,
        marginTop: 5,
        borderColor: "#AEAEAE",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    views2: {
        borderWidth: 1,
        height: 50,
        width: 275,
        marginTop: 5,
        borderColor: "#AEAEAE",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    expic: {
        width: 275,
        height: 150,
        marginTop: 15,
        borderRadius: 5,
    }
})
export default PostMain;
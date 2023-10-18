import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [select, setSelect] = useState(true);
  const selectorArray = [
    {
      icon: "book-outline",
      category: "หมวดการเรียน"
    },
    {
      icon: "medal-outline",
      category: "หมวดกีฬา"
    },
    {
      icon: "school-outline",
      category: "หมวดสหกิจ"
    },
    {
      icon: "people-outline",
      category: "หมวดจิตอาสา"
    },
    {
      icon: "ellipsis-horizontal",
      category: "หมวดอื่นๆ"
    },
  ];

  const iconMapping = {
    "book-outline": "book-outline",
    "medal-outline": "medal-outline",
    "school-outline": "school-outline",
    "people-outline": "people-outline",
    "ellipsis-horizontal": "ellipsis-horizontal",
  };
  const infoArray = [
    {
      icon: "person-outline",
      title: "ชื่อบัญชีผู้ใช้งาน",
      info: "tunatun"
    },
    {
      icon: "mail-outline",
      title: "อีเมล",
      info: "64070046@kmitl.ac.th"
    },
    {
      icon: "phone-portrait-sharp",
      title: "เบอร์โทรศัพท์",
      info: "0864159979"
    },
    {
      icon: "briefcase-outline",
      title: "รหัสประจำตัวนักศึกษา",
      info: "64070046"
    },
    {
      icon: "location-outline",
      title: "มหาวิทยาลัย",
      info: "KMITL"
    },
  ];

  const infoIcon = {
    "person-outline": "person-outline",
    "mail-outline": "mail-outline",
    "phone-portrait-sharp": "phone-portrait-sharp",
    "briefcase-outline": "briefcase-outline",
    "location-outline": "location-outline",
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={{ marginBottom: 10, height: 170 }}
            source={require("../assets/teletun.jpg")}
          />
          <Text style={{ fontSize: 18, marginBottom: 10 }}>ธรรมปพน ประทุม</Text>
          <View style={styles.selector}>
            <TouchableOpacity
              style={{
                backgroundColor: select ? "#F8F2DC" : '#81ADC8',
                width: "47%",
                height: "75%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 200
              }}
              onPress={() => {
                setSelect(true);
              }}
            >
              <Text style={{ fontSize: 16 }}>เนื้อหา</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: select ? "#81ADC8" : '#F8F2DC',
                width: "47%",
                height: "75%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 200
              }}
              onPress={() => {
                setSelect(false);
              }}
            >
              <Text style={{ fontSize: 16 }}>ข้อมูลส่วนตัว</Text>
            </TouchableOpacity>
          </View>
          {select ? (
            <View style={{ width: "100%", marginTop: 15 }}>
              {selectorArray.map((data, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "#FFFFFF", width: "100%", justifyContent: 'space-evenly', alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                  <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 10 }}>
                    <Ionicons style={{ textAlign: "center", padding: 15 }} name={iconMapping[data.icon]} size={30} color="black" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: 'left' }}>{data.category}</Text>
                  </View>
                  <Ionicons style={{marginRight: 30}} name="chevron-forward" size={30} color="black" />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={{ width: "100%", marginTop: 15 }}>
              {infoArray.map((data, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "#FFFFFF", width: "100%", justifyContent: 'space-evenly', alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                  <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 20, marginRight: 10 }}>
                    <Ionicons style={{ textAlign: "center", padding: 15 }} name={infoIcon[data.icon]} size={30} color="black" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#AAA4A4", fontSize: 14, textAlign: 'left', margin: 3 }}>{data.title}</Text>
                    <Text style={{ fontSize: 14, textAlign: 'left', margin: 3 }}>{data.info}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  selector: {
    justifyContent: 'space-evenly',
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "#81ADC8",
    width: "70%",
    height: "7%",
    borderRadius: 100,
    marginTop: 15
  }
});

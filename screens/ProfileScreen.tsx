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

  // Define a mapping of your data.icon values to actual icon names
  const iconMapping = {
    "book-outline": "ios-book",
    "medal-outline": "ios-medal",
    "school-outline": "ios-school",
    "people-outline": "ios-people",
    "ellipsis-horizontal": "ios-ellipsis-horizontal",
  };

  return (
    <ScrollView style={{ flex: 1 }}>
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
            <View style={{ width: "100%", marginTop: 5 }}>
              {selectorArray.map((data, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "#e3e3e3", width: "100%", justifyContent: 'space-evenly', alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons style={{ textAlign: "center", padding: 15 }} name={iconMapping[data.icon]} size={30} color="black" />
                  </View>
                  <Text style={{fontSize: 20}}>{data.category}</Text>
                  <Ionicons name="chevron-forward" size={30} color="black" />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={{ width: "100%", marginTop: 5 }}>
              {selectorArray.map((data, index) => (
                <TouchableOpacity key={index} style={{ backgroundColor: "#e3e3e3", width: "100%", justifyContent: 'space-evenly', alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons style={{ textAlign: "center", padding: 15 }} name={iconMapping[data.icon]} size={30} color="black" />
                  </View>
                  <Text>{data.category}</Text>
                  <Ionicons name="chevron-forward" size={30} color="black" />
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

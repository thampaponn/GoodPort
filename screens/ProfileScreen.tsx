import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from '@rneui/themed';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [select, setSelect] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={{ marginBottom: 10, height: 170 }}
            source={require("../assets/teletun.jpg")} />
          <Text style={{ fontSize: 18, marginBottom: 10 }}>ธรรมปพน ประทุม</Text>
          <Chip title={"Student"} type="outline" size="md" />
          <View style={styles.selector}>
            <TouchableOpacity style={{ backgroundColor: select ? "#F8F2DC" : '#81ADC8', width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200 }}
              onPress={() => {
                setSelect(true)
              }}
            >
              <Text style={{ fontSize: 18 }}>เนื้อหา</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: select ? "#81ADC8" : '#F8F2DC', width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200 }} onPress={() => {
              setSelect(false)
            }}
            >
              <Text style={{ fontSize: 18 }}>ข้อมูลส่วนตัว</Text>
            </TouchableOpacity>
          </View>
          {
            select ? (
              <View>
                <TouchableOpacity>

                  <Text>หมวดการเรียน</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>หมวดกีฬา</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>หมวดสหกิจ</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>หมวดจิตอาสา</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>หมวดอื่นๆ</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity>
                  <Ionicons name="home" size={20} color="red" />
                  <Text>ชื่อบัญชีผู้ใช้งาน</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>อีเมล</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>หมายเลขโทรศัพท์</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>รหัสประจำตัวนักศึกษา</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>มหาวิทยาลัย</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    </View>
  )
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
    width: "80%",
    height: "10%",
    borderRadius: 100,
    marginTop: 15
  }
})
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from '@rneui/themed';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {
  const [select, useSelect] = useState(false);
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ marginBottom: 10, height: 170 }}
          source={require("../assets/teletun.jpg")} />
        <Text style={{ fontSize: 18, marginBottom: 10 }}>ธรรมปพน ประทุม</Text>
        <Chip title={"Student"} type="outline" size="md" />
        <View style={styles.selector}>
          <TouchableOpacity style={{ backgroundColor: "#F8F2DC", width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200 }}>
            <Text style={{ fontSize: 18 }}>เนื้อหา</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#F8F2DC", width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200 }}>
            <Text style={{ fontSize: 18 }}>ข้อมูลส่วนตัว</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{
            justifyContent: "center",
            backgroundColor: "#81ADC8",
            width: "80%",
            height: 42,
            borderRadius: 10,
            marginTop: 10
          }}
        >
          <Text style={{ textAlign: "center" }}>Search</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
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
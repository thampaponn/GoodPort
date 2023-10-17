import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from '@rneui/themed';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ marginBottom: 10, height: 170, marginTop: 20 }}
        source={require("../assets/teletun.jpg")} />
      <Text style={{ marginBottom: 10 }}>ธรรมปพน ประทุม</Text>
      <Chip title={"Student"} type="outline" size="md" />
      <View style={styles.selector}>
        <TouchableOpacity style={{backgroundColor: "#F8F2DC", width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200}}>
          <Text style={{fontSize: 20}}>เนื้อหา</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: "#F8F2DC", width: "47%", height: "75%", alignItems: "center", justifyContent: "center", borderRadius: 200}}>
          <Text style={{fontSize: 20}}>ข้อมูลส่วนตัว</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={{
          marginTop: 42,
          justifyContent: "center",
          backgroundColor: "#81ADC8",
          width: "100%",
          height: 42,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selector: {
    justifyContent: 'space-evenly',
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "#81ADC8",
    width: "85%",
    height: "9%",
    borderRadius: 100,
  }
})
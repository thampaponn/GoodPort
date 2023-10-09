import { View, Text, SafeAreaView } from 'react-native'
import { Button, Card, Chip, Input } from "@rneui/themed";
import React from 'react'
import { InputForm } from '../components/ui/InputForm';

export default function AddPortScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <Card containerStyle={{ borderRadius: 20, padding: 25 }}>
      <InputForm title='ชื่อโครงงานภาษาไทย' />
        <Button
          onPress={() => { navigation.navigate("Home") }}
          title={"อัพโหลด"}
          buttonStyle={{
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: "#81ADC8",
          }}
        />
      </Card>
    </SafeAreaView>
  )
}
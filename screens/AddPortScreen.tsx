import { View, Text, SafeAreaView } from 'react-native'
import { Button, Card, Chip, Input } from "@rneui/themed";
import React from 'react'
import { InputForm } from '../components/ui/InputForm';

export default function AddPortScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Card containerStyle={{ borderRadius: 20, padding: 25 }}>
      <InputForm title='ชื่อโครงงานภาษาไทย' />
      <InputForm title='ชื่อโครงงานภาษาอังกฤษ' />
      <InputForm title='ประเภทโครงงาน' />
      <InputForm title='จุดประสงค์' />
      <InputForm title='ที่มา' />
      <InputForm title='รายละเอียด' />
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
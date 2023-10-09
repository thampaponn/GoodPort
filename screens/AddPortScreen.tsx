import { Text, SafeAreaView } from 'react-native'
import { Button, Card, Input } from "@rneui/themed";
import React from 'react'

export default function AddPortScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <Card containerStyle={{ borderRadius: 20, padding: 25 }}>
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>ชื่อโครงงานภาษาไทย</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>ชื่อโครงงานภาษาอังกฤษ</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>ประเภทโครงงาน</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>จุดประสงค์</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>ที่มา</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>รายละเอียด</Text>
        <Input style={{ borderRadius: 5, borderColor: "#AEAEAE", borderWidth: 1, marginTop: 6 }} inputContainerStyle={{ borderBottomWidth: 0 }} />
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
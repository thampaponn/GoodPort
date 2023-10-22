import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, ListItem } from "@rneui/themed";
import { ProductConfirmCardNotification } from "../components/ProductConfirmCardNotification";
import { Userjwt } from "../types/userjwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export default function NotificationScreen({navigation}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [logToggle, setLogToggle] = useState<boolean>(true);
  const [user, setUser] = useState<Userjwt>(null);


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded: { sub: Userjwt } = jwtDecode(token);
        const user = decoded.sub;
        setUser(user)
        
      } catch (error) {
        navigation.navigate("signin");
        console.log("เกิดข้อผิดพลาดในการดึง token:", error);
      }
    };
    retrieveToken();
  }, []);


  const mockupData = [
    {
      name: "hellodadasfasgasgagagarsr14141",
      owner: "ธนาธิป สิงหานนท์",
      advisor: "อาจารย์ ขิม",
      category: "Learning",
    },
    {
      name: "hellodadasfasgasgagagarsr14141",
      owner: "ธนาธิป สิงหานนท์",
      advisor: "อาจารย์ ขิม",
      category: "Learning",
    },
  ];
  const NodataComfirm = mockupData.length === 0;
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <ListItem.Accordion
        containerStyle={{ borderWidth: 1 }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20, fontWeight: "600" }}>
                ต้องการยืนยัน
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={logToggle}
        onPress={() => {
          setLogToggle(!logToggle);
        }}
      >
        <ScrollView
          style={{
            maxHeight: 300,
            width: "100%",
            height: 300,
            backgroundColor: "#FFFFFF",
          }}
        >
          {mockupData &&
            mockupData.map((data, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                <ProductConfirmCardNotification
                  name={data.name}
                  owner={data.owner}
                  advisor={data.advisor}
                  category={data.category}
                />
              </View>
            ))}
          {NodataComfirm && <NotificationEmpty text={"ไม่มีโปรเจคให้ยืนยัน"} />}
        </ScrollView>
      </ListItem.Accordion>


      <ListItem.Accordion
        containerStyle={{ borderWidth: 1 }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20, fontWeight: "600" }}>
                แจ้งเตือน
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ScrollView
          style={{
            maxHeight: 300,
            width: "100%",
            backgroundColor: "#FFFFFF",
            height: "100%",
          }}
        >
          {mockupData &&
            mockupData.map((data, index) => (
              <View key={index} style={{ marginTop: 1 }}>
                <ProductNotificationCard text={data.name} />
              </View>
            ))}
          {NodataComfirm && <NotificationEmpty text={"ไม่มีแจ้งเตือน"} />}
        </ScrollView>
      </ListItem.Accordion>
    </SafeAreaView>
  );
}

const NotificationEmpty = ({ text }) => {
  return (
    <Card>
      <Text>{text}</Text>
    </Card>
  );
};

const ProductNotificationCard = ({ text }) => {
  return (
    <Card containerStyle={{ marginTop: 2 }}>
      <Text>
        โปรเจค <Text style={{ color: "#0098DA" }}>{text}</Text> ถูกยืนยันแล้ว
      </Text>
    </Card>
  );
};

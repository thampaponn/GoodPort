import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Card, ListItem } from "@rneui/themed";
import { ProductConfirmCardNotification } from "../components/ProductConfirmCardNotification";
import { Userjwt } from "../types/userjwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Constants from "expo-constants";
import axios from "axios";
import { Button } from "@rneui/base";

export default function NotificationScreen({ navigation }) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [logToggle, setLogToggle] = useState<boolean>(true);
  const [user, setUser] = useState<Userjwt>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAleart] = useState<any>(null);
  const [alertConfirm, setAlertConfirm] = useState<any>(null);

  const retrieveToken = useCallback(async () => {
    console.log("click")
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded: { sub: Userjwt } = jwtDecode(token);
      const user = decoded.sub;
      setUser(user);

      axios
        .get(
          `${Constants.expoConfig.extra.API_URL}/alert/byadvisorId/${user._id}`
        )
        .then((response) => {
          setAleart(response.data);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });

      axios
        .get(
          `${Constants.expoConfig.extra.API_URL}/alert/byUserIdConfirm/${user._id}`
        )
        .then((response) => {
          setAlertConfirm(response.data);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });

    } catch (error) {
      navigation.navigate("signin");
      console.log("เกิดข้อผิดพลาดในการดึง token:", error);
    }
  }, [navigation]);

  useEffect(() => {
    retrieveToken();
  }, [retrieveToken]);

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
          {alert &&
            alert.map((data:any, index:number) => (
              <View key={index} style={{ marginTop: 10 }}>
                <ProductConfirmCardNotification
                  navigation={navigation}
                  name={data.postTitle}
                  owner={data.owner.fname + " " + data.owner.lname}
                  advisor={data.advisorFname + " " + data.advisorLname}
                  category={data.postCategory}
                  id={data.advisorId}
                  postId={data.postId}
                  action={retrieveToken}
                />
              </View>
            ))}
          {alert && alert.length === 0 && <NotificationEmpty text={"ไม่มีโปรเจคให้ยืนยัน"} />}
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
          {alertConfirm &&
            alertConfirm.map((data, index) => (
              <View key={index} style={{ marginTop: 1 }}>
                <ProductNotificationCard text={data.postTitle} />
              </View>
            ))}
          {alertConfirm && alertConfirm.length === 0 && <NotificationEmpty text={"ไม่มีแจ้งเตือน"} />}
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

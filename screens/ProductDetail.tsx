import { Button, Card, Chip, Icon } from "@rneui/themed";
import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { PostStatus } from "../types/postStatus";
import * as Linking from "expo-linking";

const ProductDetail = ({ route }) => {
  const [select, setSelect] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [advisor, setAdvisor] = useState<any>(null);
  function checkSelect() {
    if (select === true) {
      setSelect(false);
    } else {
      setSelect(true);
    }
  }

  const openWebsite = async () => {
    const url = product.file;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("ไม่สามารถเปิด URL นี้ได้");
    }
  };
  const { data } = route.params;
  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.API_URL}/post/${data}`
      );
      setProduct(response.data);
      if (response.data.advisor.userId) {
        const resAdvisor = await axios.post(
          `${Constants.expoConfig.extra.API_URL}/user/${response.data.advisor.userId}`
        );
        setAdvisor(resAdvisor.data);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const infoArray = [
    {
      name: "ธนาธิป เกย์โบ๊ต",
      comment: "อยากเป็นเกย์ครับ",
    },
    {
      name: "ธนาธิป เกย์โบ๊ต",
      comment: "อยากเป็นเกย์ครับ",
    },
    {
      name: "ธนาธิป เกย์โบ๊ต",
      comment: "อยากเป็นเกย์ครับ",
    },
    {
      name: "ธนาธิป เกย์โบ๊ต",
      comment: "อยากเป็นเกย์ครับ",
    },
    {
      name: "ธนาธิป เกย์โบ๊ต",
      comment: "อยากเป็นเกย์ครับ",
    },
  ];
  return (
    <View>
      <ScrollView style={{ height: "100%", backgroundColor: "#F4F4F4" }}>
        <Card
          containerStyle={{ borderRadius: 15, padding: 30, marginBottom: 70 }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            {!loading && product.image ? (
              <Card.Image
                style={{ width: 150, height: 150, borderRadius: 3 }}
                source={{
                  uri: product.image,
                }}
              />
            ) : (
              <Card.Image
                style={{ width: 150, height: 150, borderRadius: 3 }}
                source={require("../assets/placeholder.png")}
              />
            )}
          </View>
          {!loading && (
            <Card.Title
              style={{ color: "#0098DA", fontSize: 24, marginTop: 5 }}
            >
              {product.nameTh}
            </Card.Title>
          )}
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 15, marginBottom: 15 }}
          >
            {!loading &&
              product.advisor.userId &&
              product.status === PostStatus.accepted && (
                  <Icon
                    name="verified"
                    color={"#86D789"}
                    containerStyle={{ flex: 1, alignItems: "flex-start" }}
                    size={35}
                  />
              )}
            <Button
              containerStyle={{ width: "25%", borderRadius: 12 }}
              color={"#3444A8"}
              title={"แก้ไข"}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>ประเภทของโครงงาน : </Text>
            {!loading && (
              <Chip title={product.category} type="outline" size="sm" />
            )}
          </View>


          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 15 }}
          >
            <Text style={{ fontSize: 16 }}>วัตถุประสงค์ : </Text>
            {!loading && (
              <Text style={{ fontSize: 16 }}>
                {product.objective ? product.objective : "ไม่มี"}
              </Text>
            )}
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 15 }}
          >
            <Text style={{ fontSize: 16 }}>ที่มาของโครงงาน : </Text>
            {!loading && (
              <Text style={{ fontSize: 16 }}>
                {product.source ? product.source : "ไม่มี"}
              </Text>
            )}
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 15 }}
          >
            <Text style={{ fontSize: 16 }}>รายละเอียดโครงงาน : </Text>
            {!loading && (
              <Text style={{ fontSize: 16 }}>
                {product.detail ? product.detail : "ไม่มี"}
              </Text>
            )}
          </View>

          <View style={{ marginTop: 15 }}>
            {!loading && product.file && (
              <View>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  ไฟล์ที่เกี่ยวข้อง
                </Text>

                <Card containerStyle={{ borderRadius: 12 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="picture-as-pdf"
                      size={30}
                      containerStyle={{ alignItems: "flex-start" }}
                    />
                    <Button
                      color={"white"}
                      containerStyle={{ width: "90%", borderRadius: 5 }}
                      titleStyle={{ color: "black" }}
                      title={"ตรวจสอบไฟล์"}
                      onPress={() => {
                        openWebsite();
                      }}
                    />
                  </View>
                </Card>
              </View>
            )}

            {!loading && product.advisor.userId && (
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  อาจารย์ที่ปรึกษา
                </Text>
                <View>
                  <Card containerStyle={{ borderRadius: 12 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      {!loading && advisor.image.profileImage ? (
                        <Card.Image
                          style={{ width: 40, height: 40, borderRadius: 100 }}
                          source={{ uri: advisor.image.profileImage }}
                        />
                      ) : (
                        <Card.Image
                          style={{ width: 40, height: 40, borderRadius: 100 }}
                          source={require("../assets/placeholder.png")}
                        />
                      )}

                      <View style={{ marginLeft: 20 }}>
                        <Text>
                          {product.advisor.fname + " " + product.advisor.lname}
                        </Text>
                        <Text>{product.advisor.email}</Text>
                      </View>
                    </View>
                  </Card>
                </View>
              </View>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#AEAEAE",
  },
  textInput: {
    width: 307,
    height: 42,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
});

export default ProductDetail;

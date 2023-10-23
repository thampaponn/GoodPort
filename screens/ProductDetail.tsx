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
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const fileMockup = ["madara.pdf", "madara.pdf"];

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
              containerStyle={{ width: "40%", borderRadius: 12 }}
              color={"#81ADC8"}
              title={"edit"}
            />
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

            {!loading && product.advisor.userId && (
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  อาจารย์ที่ปรึกษา
                </Text>
                <View>
                  <Card containerStyle={{ borderRadius: 12 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Card.Image
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                        source={{
                          uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
                        }}
                      />
                      <View style={{ marginLeft: 20 }}>
                        <Text>{product.advisor.fname + " " + product.advisor.lname}</Text>
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
      {select ? (
        <View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "10%",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
              }}
            >
              <Text style={{ textAlign: "center" }}>ความคิดเห็น</Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 70,
              }}
            >
              {infoArray.map((info, index) => (
                <View
                  key={index}
                  style={{
                    width: "95%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
                    borderColor: "#AEAEAE",
                    borderWidth: 2,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 10,
                    }}
                  >
                    <Ionicons
                      style={{ textAlign: "center", padding: 15 }}
                      name={"person"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {info.name}
                    </Text>
                    <Text
                      style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                    >
                      {info.comment}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.textInputContainer}>
        <TouchableOpacity>
          <TextInput style={styles.textInput} placeholder="Aa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => checkSelect()}>
          <Ionicons
            style={{ textAlign: "center", marginLeft: 18 }}
            name="send"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
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

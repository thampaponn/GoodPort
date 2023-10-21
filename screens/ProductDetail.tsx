import { Button, Card, Chip, Icon } from "@rneui/themed";
import React from "react";
import { View, Text, ScrollView } from "react-native";

const ProductDetail = ({route}) => {
  const { data } = route.params;
  const ImageMockup = [
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  ];
  const fileMockup = ["madara.pdf", "madara.pdf"];


  return (
    <ScrollView style={{ height: "100%", backgroundColor: "#FFFFFF" }}>
      <Card containerStyle={{ borderRadius: 15, padding: 30 }}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Card.Image
            style={{ width: 150, height: 150, borderRadius: 3 }}
            source={{
              uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
            }}
          />
        </View>
        <Card.Title style={{ color: "#0098DA", fontSize: 24, marginTop: 5 }}>
          afmsalfaslfaflakflsa
        </Card.Title>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>ประเภทของโครงงาน : </Text>
          <Chip title={"learning"} type="outline" size="sm" />
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
          <Icon
            name="verified"
            color={"#86D789"}
            containerStyle={{ flex: 1, alignItems: "flex-start" }}
            size={35}
          />
          <Button
            containerStyle={{ width: "40%", borderRadius: 12 }}
            color={"#81ADC8"}
            title={"edit"}
          />
        </View>

        <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>วัตถุประสงค์ : </Text>
          <Text style={{ fontSize: 16 }}>Madara</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>ที่มาของโครงงาน : </Text>
          <Text style={{ fontSize: 16 }}>Madara</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>รายละเอียดโครงงาน : </Text>
          <Text style={{ fontSize: 16 }}>Madara</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            รูปที่เกี่ยวข้อง
          </Text>
          {ImageMockup.map((image, index) => (
            <Card.Image
              key={index}
              containerStyle={{ marginTop: 10, borderRadius: 5 }}
              source={{
                uri: `${image}`,
              }}
            />
          ))}
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            ไฟล์ที่เกี่ยวข้อง
          </Text>
          {fileMockup.map((file, index) => (
            <Card key={index} containerStyle={{ borderRadius: 12 }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Icon
                  name="picture-as-pdf"
                  size={20}
                  containerStyle={{ alignItems: "flex-start" }}
                />
                <Text style={{ marginLeft: 10 }}>{file}</Text>
              </View>
            </Card>
          ))}
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
                    <Text>Hello</Text>
                    <Text>boat@gmail.com</Text>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};


export default ProductDetail;

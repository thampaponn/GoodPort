import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const ProductCategoryPostCard = ({ product, navigation }) => {
  return (
    <View style={{ margin: 15 }}>
      <View
        style={{
          justifyContent: "center",
          borderRadius: 10,
          borderColor: "#D9D9D9",
          borderWidth: 1,
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 18,
            fontWeight: "600",
            color: "#0098DA",
            marginLeft: 5,
          }}
        >
          {product.nameTh}
        </Text>
        <Text style={{ textAlign: "left", marginLeft: 5 }}>
          ประเภทของโครงงาน : {product.category}
        </Text>
        {product.advisor.userId ? (
          <Text style={{ textAlign: "left", marginLeft: 5 }}>
            อาจารย์ที่ปรึกษา :{" "}
            {product.advisor.fname + " " + product.advisor.lname}
          </Text>
        ) : (
          <Text style={{ textAlign: "left", marginLeft: 5 }}>
            อาจารย์ที่ปรึกษา :{"ไม่มี"}
          </Text>
        )}

        <View style={{ alignItems: "center", marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("detail", { data: product._id })}
            style={{
              borderRadius: 5,
              borderColor: "#D9D9D9",
              borderWidth: 1,
              width: "100%",
              padding: 5,
              justifyContent: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              แสดงรายละเอียด
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

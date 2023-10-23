import { Card, Chip } from "@rneui/themed";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCategory = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <SafeAreaView>
        <Card
          containerStyle={{ borderRadius: 8, padding: 0, paddingVertical: 10 }}
        >
          <Card
            containerStyle={{
              paddingHorizontal: 10,
              padding: 0,
              marginVertical: 0,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Card.Image
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                }}
                source={require("../assets/placeholder.png")}
              />
              <View style={{ marginLeft: 10 }}>
                <Text>TanaThip Singhanon</Text>
                <Chip
                  containerStyle={{ marginTop: 5 }}
                  title={"Student"}
                  color="success"
                  size="sm"
                />
              </View>
            </View>
          </Card>

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
                ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น
              </Text>
              <Text style={{ textAlign: "left", marginLeft: 5 }}>
                ประเภทของโครงงาน : Other
              </Text>
              <Text style={{ textAlign: "left", marginLeft: 5 }}>
                อาจารย์ที่ปรึกษา : อาจารย์ขิม
              </Text>
              <View style={{ alignItems: "center", marginTop: 5 }}>
                <TouchableOpacity
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
        </Card>
      </SafeAreaView>
    </View>
  );
};

export default ProductCategory;

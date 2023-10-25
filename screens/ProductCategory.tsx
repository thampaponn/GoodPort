import { Card, Chip } from "@rneui/themed";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCategory = ({ route }) => {
  const { data, category } = route.params;
  console.log("data =>", data, "category =>", category)
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <SafeAreaView>
        <ScrollView>
          <Card
            containerStyle={{
              paddingHorizontal: 10,
              padding: 0,
              marginVertical: 0,
              borderRadius: 10
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

          <View style={{ justifyContent: "center", borderRadius: 20, borderWidth: 2, borderColor: "#D4D4D4", marginHorizontal: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 2, borderColor: "#D4D4D4" }}>
              <Image
                style={{
                  margin: 15,
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                }}
                source={require("../assets/placeholder.png")}
              />
              <View>
                <Text style={{ marginBottom: 5 }}>Nutaya Nitiapaitham</Text>
                <Chip title="yee" type="outline" size="sm" />
              </View>
            </View>
            <View style={{ margin: 15 }}>
              <Text>รับสมัครแฮกเกอร์</Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    margin: 15,
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                  }}
                  source={require("../assets/placeholder.png")}
                />
              </View>
              <Text style={{ textAlign: "right", color: "#AEAEAE" }}>created 1 Jan 2020</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductCategory;

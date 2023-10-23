import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Userjwt } from "../types/userjwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Chip, Dialog } from "@rneui/themed";
import Constants from "expo-constants";
import axios from "axios";
import { ProjectHeader } from "../components/ProjectHeader";
import { UserRole } from "../types/role";

export default function ProfileScreen({ navigation, route }) {
  const [select, setSelect] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded: { sub: Userjwt } = jwtDecode(token);
        const user = decoded.sub;

        axios
          .post(`${Constants.expoConfig.extra.API_URL}/user/${user._id}`)
          .then((response) => {
            setUser(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        navigation.navigate("signin");
        console.log("เกิดข้อผิดพลาดในการดึง token:", error);
      }
    };
    retrieveToken();
  }, []);

  const selectorArray = [
    {
      icon: "book-outline",
      category: "หมวดการเรียน",
    },
    {
      icon: "medal-outline",
      category: "หมวดกีฬา",
    },
    {
      icon: "school-outline",
      category: "หมวดสหกิจ",
    },
    {
      icon: "people-outline",
      category: "หมวดจิตอาสา",
    },
    {
      icon: "ellipsis-horizontal",
      category: "หมวดอื่นๆ",
    },
  ];

  const iconMapping = {
    "book-outline": "book-outline",
    "medal-outline": "medal-outline",
    "school-outline": "school-outline",
    "people-outline": "people-outline",
    "ellipsis-horizontal": "ellipsis-horizontal",
  };

  const infoIcon = {
    "person-outline": "person-outline",
    "mail-outline": "mail-outline",
    "phone-portrait-sharp": "phone-portrait-sharp",
    "briefcase-outline": "briefcase-outline",
    "location-outline": "location-outline",
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ProjectHeader navigation={navigation} user={user} />
      <Dialog isVisible={loading}>
        <Dialog.Loading />
      </Dialog>
      <SafeAreaView>
        <View style={styles.container}>
          {!loading && user.image.profileImage ? (
            <Image
              style={{
                marginTop: 15,
                marginBottom: 10,
                height: 180,
                width: 180,
                borderRadius: 100,
              }}
              source={{ uri: user.image.profileImage }}
            />
          ) : (
            <Image
              style={{
                marginTop: 15,
                marginBottom: 10,
                height: 180,
                width: 180,
                borderRadius: 100,
              }}
              source={require("../assets/placeholder.png")}
            />
          )}
          {!loading && (
            <View>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                {user.fname + " " + user.lname}
              </Text>
              <Chip color={"success"} title={user.role} />
            </View>
          )}

          <View style={styles.selector}>
            <TouchableOpacity
              style={{
                backgroundColor: select ? "#F8F2DC" : "#81ADC8",
                width: 150,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => {
                setSelect(true);
              }}
            >
              <Text style={{ fontSize: 16 }}>เนื้อหา</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: select ? "#81ADC8" : "#F8F2DC",
                width: 150,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => {
                setSelect(false);
              }}
            >
              <Text style={{ fontSize: 16 }}>ข้อมูลส่วนตัว</Text>
            </TouchableOpacity>
          </View>
          {select ? (
            !loading && user.role != UserRole.Advisor ? (
              <View style={{ width: "100%", marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("category")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"book-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"หมวดการเรียน"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"medal-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"หมวดกีฬา"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"school-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"หมวดสหกิจ"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"people-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"หมวดจิตอาสา"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"ellipsis-horizontal"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"หมวดอื่นๆ"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: "100%", marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("category")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"book-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, textAlign: "left" }}>
                      {"โพสต์อาจารย์"}
                    </Text>
                  </View>
                  <Ionicons
                    style={{ marginRight: 30 }}
                    name="chevron-forward"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            )
          ) : (
            <View style={{ width: "100%", marginTop: 10, marginBottom: 60 }}>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"person-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"ชื่อบัญชีผู้ใช้งาน"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.username ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"mail-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"อีเมล"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.email ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"phone-portrait-sharp"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"เบอร์โทรศัพท์"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.phone ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"briefcase-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"รหัสประจำตัวนักศึกษา"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.job.studentId ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"location-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"มหาวิทยาลัย"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.location ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"briefcase-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"มหาวิทยาลัยที่จบการศึกษา"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.university ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"location-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"ประเทศที่จบการศึกษา"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.graduatedFrom ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"briefcase-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"อาชีพ"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.location ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"location-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"สถานที่ทำงาน"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.location ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row",
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
                      name={"call-outline"}
                      size={30}
                      color="black"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#AAA4A4",
                        fontSize: 14,
                        textAlign: "left",
                        margin: 3,
                      }}
                    >
                      {"หมายเลขติดต่อที่ทำงาน"}
                    </Text>

                    {!loading && (
                      <Text
                        style={{ fontSize: 14, textAlign: "left", margin: 3 }}
                      >
                        {user.information.companyNumber ?? "ไม่ระบุ"}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity style={{justifyContent: "center", alignItems: "center", backgroundColor: "#EC785E", padding: 15, margin: 30, borderRadius: 10}}>
          <Text style={{color: "#FFFFFF", fontWeight: "600", fontSize: 18}}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  selector: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#81ADC8",
    width: 315,
    height: 50,
    borderRadius: 50,
    marginTop: 15,
  },
});

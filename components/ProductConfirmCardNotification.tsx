import { Button, Chip, Card } from "@rneui/themed";
import { View, Text } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

type ProductConfirmCardNotificationProps = {
  name: string;
  category: string;
  owner: string;
  advisor: string;
  id: string;
  navigation: any;
  postId: string;
  action: () => void;
};

export const ProductConfirmCardNotification = ({
  navigation,
  name,
  category,
  owner,
  advisor,
  id,
  postId,
  action,
}: ProductConfirmCardNotificationProps) => {
  const handleSubmit = () => {
    navigation.navigate("detail", { data: postId });
  };

  const handleChangeStatus = async () => {
    await axios.post(
      `${Constants.expoConfig.extra.API_URL}/alert/updateDetailToAccepted/${id}/${postId}`
    );
    await axios.post(
      `${Constants.expoConfig.extra.API_URL}/post/updateStatusToAccepted/${postId}`
    );
    action();
  };
  return (
    <Card containerStyle={{ borderRadius: 8, marginTop: 5 }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 18,
          color: "#0098DA",
        }}
      >
        {name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16 }}>ประเภทของโครงงาน : </Text>
        <Chip title={category} type="outline" size="sm" />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16 }}>เจ้าของโครงงาน : </Text>
        <Text style={{ fontSize: 16 }}>{owner}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 16 }}>อาจารย์ที่ปรึกษา : </Text>
        <Text style={{ fontSize: 16 }}>{advisor}</Text>
      </View>
      <View>
        <Button
          color={"white"}
          titleStyle={{ color: "black" }}
          containerStyle={{
            borderRadius: 8,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#C5D2C6",
          }}
          onPress={() => handleSubmit()}
        >
          แสดงรายละเอียด
        </Button>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button
        titleStyle={{color:"#FFFFFF"}}
          color={"#86D789"}
          containerStyle={{
            borderRadius: 8,
            marginTop: 10,
            width: "100%",

          }}
          onPress={() => handleChangeStatus()}
        >
          ยืนยัน
        </Button>
      </View>
    </Card>
  );
};

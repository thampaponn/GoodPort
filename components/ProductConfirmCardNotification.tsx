import { Button, Chip, Card } from "@rneui/themed";
import { View, Text } from "react-native";

type ProductConfirmCardNotificationProps = {
  name: string;
  category: string;
  owner: string;
  advisor: string;
};

export const ProductConfirmCardNotification = ({
  name,
  category,
  owner,
  advisor,
}: ProductConfirmCardNotificationProps) => {
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
          color={"#AEAEAE"}
          containerStyle={{ borderRadius: 8, marginTop: 10 }}
        >
          แสดงรายละเอียด
        </Button>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button
          color={"#86D789"}
          containerStyle={{
            borderRadius: 8,
            marginTop: 10,
            width: 160,
          }}
        >
          ยืนยัน
        </Button>
        <View style={{ flex: 1 }}></View>
        <Button
          color={"#BE2C35"}
          containerStyle={{
            borderRadius: 8,
            marginTop: 10,
            width: 160,
          }}
        >
          ปฎิเสธ
        </Button>
      </View>
    </Card>
  );
};

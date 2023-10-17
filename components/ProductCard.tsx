import { useNavigation } from "@react-navigation/native";
import { Button, Card, Chip } from "@rneui/themed";
import { View, Text } from "react-native";
import { advisor } from "../types/post";

type owner = {
  userId: string;
  fname: string;
  lname: string;
  email: string;
};

type ProductCardProps = {
  image?: string;
  name: string;
  category: string;
  owner: owner;
  advisor?: advisor;
};

export const ProductCard = ({
  image,
  name,
  category,
  owner,
  advisor,
}: ProductCardProps) => {
  const navigation: any = useNavigation();
  const handleSubmit = () => {};
  return (
    <Card containerStyle={{ borderRadius: 20, padding: 25 }}>
      <View style={{ display: "flex", alignItems: "center" }}>
        <Card.Image
          style={{ width: 150, height: 150, borderRadius: 3 }}
          source={{
            uri: `${image}`,
          }}
        />
      </View>

      <Card.Title style={{ color: "#0098DA", fontSize: 24, marginTop: 5 }}>
        {name}
      </Card.Title>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
          width: "50%",
        }}
      >
        <Text style={{ fontSize: 16 }}>เจ้าของโครงงาน : </Text>
        <Text style={{ fontSize: 16 }}>{owner.fname + " " + owner.lname}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
        {advisor && (
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 16 }}>อาจารย์ที่ปรึกษา : </Text>
            <Text style={{ fontSize: 16 }}>
              {advisor.fname + " " + advisor.lname}
            </Text>
          </View>
        )}
      </View>

      <Button
        onPress={() => navigation.navigate("detail")}
        title={"แสดงรายละเอียด"}
        buttonStyle={{
          marginTop: 20,
          borderRadius: 8,
          backgroundColor: "#81ADC8",
        }}
      />
    </Card>
  );
};

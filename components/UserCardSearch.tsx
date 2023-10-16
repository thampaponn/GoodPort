import { Card } from "@rneui/themed";
import { View, Image, Text } from "react-native";
import { User } from "../types/user";

type CardSearchProps = {
  user?: User;
  empty?: boolean;
};

export const UserCardSearch = ({ user, empty }: CardSearchProps) => {
  return (
    <Card containerStyle={{ width: "93%", padding: 10, marginVertical: 7 }}>
      {!empty && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            source={{
              uri:
                user.image.profileImage ??
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
            }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {user.fname + " " + user.lname}
            </Text>
            <Text style={{ fontSize: 14 }}>{user.email}</Text>
          </View>
        </View>
      )}
      {empty && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            ไม่พบผู้ใช้งาน
          </Text>
        </View>
      )}
    </Card>
  );
};

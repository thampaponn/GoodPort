import { Card } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { User } from "../types/user";

export const SearchMenu = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.110.192.130:3000/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View
      style={{
        marginTop: 15,
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TextInput
        style={{
          width: "90%",
          height: 42,
          backgroundColor: "#F0F0F0",
          borderColor: "#AEAEAE",
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 6,
          paddingHorizontal: 15,
        }}
      />
      <ScrollView style={{width:"100%" , marginBottom:20, margin:"auto"}}>
        {users.map((user, index) => (
          <CardSearch key={index} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

type CardSearchProps = {
  user: User;
};

const CardSearch = ({ user }: CardSearchProps) => {
  return (
    <Card containerStyle={{ width: "93%", padding: 10,marginVertical:7 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          source={{ uri: user.image.profileImage ?? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            {user.fname + user.lname}
          </Text>
          <Text style={{ fontSize: 14 }}>{user.email}</Text>
        </View>
      </View>
    </Card>
  );
};

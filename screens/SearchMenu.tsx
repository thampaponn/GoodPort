import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text } from "react-native";
import { UserCardSearch } from "../components/UserCardSearch";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export const SearchMenu = ({ navigation, route }) => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data } = route.params;

  useEffect(() => {
    axios
      .get(`${Constants.expoConfig.extra.API_URL}/user`)
      .then((response) => {
        setOriginalUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e: string) => {
    const searchTerm = e.toLowerCase();
    const filteredUsers = originalUsers.filter(
      (user) =>
        user.fname.toLowerCase().includes(searchTerm) ||
        user.lname.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredUsers);
  };
  return (
    <View
      style={{
        paddingTop: 50,
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ justifyContent: "center" }}
          onPress={() => (navigation.navigate("Profile"))}
        >
          <Ionicons
            style={{ textAlign: "center", marginRight: 10, paddingRight: 5 }}
            name={"chevron-back"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <TextInput
          style={{
            width: "82%",
            height: 42,
            backgroundColor: "#F0F0F0",
            borderColor: "#AEAEAE",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 6,
            paddingHorizontal: 15,
          }}
          onChangeText={(e) => handleSearch(e)}
        />
      </View>

      <ScrollView style={{ width: "100%", marginBottom: 20, margin: "auto" }}>
        {filteredUsers.length !== 0 ? (
          filteredUsers.map(
            (user, index) =>
              data._id != user._id && (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("profilePublic", { data: user })
                  }
                >
                  <UserCardSearch user={user} />
                </TouchableOpacity>
              )
          )
        ) : (
          <View style={{ margin: "auto" }}>
            <UserCardSearch empty={true} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

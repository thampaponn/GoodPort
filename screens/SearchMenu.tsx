import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { UserCardSearch } from "../components/UserCardSearch";
import Constants from 'expo-constants';

export const SearchMenu = () => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
        paddingTop: 30,
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <TextInput
        style={{
          width: "93%",
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
      <ScrollView style={{ width: "100%", marginBottom: 20, margin: "auto" }}>
        {filteredUsers.length !== 0 ? (
          filteredUsers.map((user, index) => (
            <UserCardSearch key={index} user={user} />
          ))
        ) : (
          <View style={{ margin: "auto" }}>
            <UserCardSearch empty={true} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

import React,{FC} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export interface HeaderProps{
  title:string
}

const Header = () => {
  return (
    <View style={{ width: "100%", paddingTop: 60 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 250, height: 95, marginLeft: 75, justifyContent: "center", alignSelf: "center" }}
          source={require("../assets/Logo3.png")}
        />
      </View>
    </View>
  );
};

export default Header;
import { Icon } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";

export const ProjectHeader = ({ navigation, user }) => {
  return (
    <View style={{ width: "100%", paddingTop: 70 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 250, height: 50, marginLeft: 70 }}
          source={require("../assets/Logo2.png")}
        />
        <TouchableOpacity
          style={{marginRight: 15}}
          onPress={() => navigation.navigate("Search", { data: user })}
        >
          <Icon name="search" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

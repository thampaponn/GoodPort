import { Icon } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";

export const ProjectHeader = ({ navigation, user }) => {
  return (
    <View style={{ width: "100%", paddingTop: 80 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 250, height: 50 }}
          source={require("../assets/Logo2.png")}
        />
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search", { data: user })}
          >
            <Icon name="search" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

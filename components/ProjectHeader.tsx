import { Icon } from "@rneui/themed";
import { View, Image, TouchableOpacity } from "react-native";

export const ProjectHeader = ({ navigation, user }) => {
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
          style={{ width: 250, height: 95, marginLeft: 65, justifyContent: "center", alignSelf: "center" }}
          source={require("../assets/Logo3.png")}
        />
        <TouchableOpacity
          style={{ marginRight: 15, marginBottom: 35 }}
          onPress={() => navigation.navigate("Search", { data: user })}
        >
          <Icon name="search" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

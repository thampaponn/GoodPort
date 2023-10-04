import { Card } from "@rneui/themed";
import { TextInput, View } from "react-native";

export const SearchMenu = () => {
  return (
    <View style={{ marginTop: 15, flex:1, alignItems:"center", backgroundColor:"#FFFFFF" }}>
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
      <Card containerStyle={{width:"80%"}}>
        
      </Card>
    </View>
  );
};

import { Button, Chip } from "@rneui/themed";
import { View, Image, Text } from "react-native";

export const ProductAdvisorCard = ({
  profileImage,
  name,
  detail,
  imagePost,
  createAt,
  product,
  navigation
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D4D4D4",
        margin: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#D4D4D4",
        }}
      >
        {profileImage ? (
          <Image
            style={{
              margin: 15,
              height: 50,
              width: 50,
              borderRadius: 100,
            }}
            source={{ uri: profileImage }}
          />
        ) : (
          <Image
            style={{
              margin: 15,
              height: 50,
              width: 50,
              borderRadius: 100,
            }}
            source={require("../assets/placeholder.png")}
          />
        )}

        <View>
          <Text style={{ marginBottom: 5 }}>{name}</Text>
          <Chip title={"Advisor"} color={'#86D789'} size="sm" />
        </View>
      </View>
      <View style={{ margin: 15 }}>
        <Text>{detail}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {imagePost ? (
            <Image
              style={{
                margin: 15,
                height: 150,
                width: 150,
              }}
              source={{
                uri: imagePost
              }}
            />
          ) : (
            <Image
              style={{
                margin: 15,
                height: 150,
                width: 150,
                borderRadius: 100,
              }}
              source={require("../assets/placeholder.png")}
            />
          )}
        </View>
        <Text style={{ textAlign: "right", color: "#AEAEAE" }}>{createAt}</Text>
        <Button
            onPress={ () => navigation.navigate("advisorDetail" ,{data: product})}
            title={"ดูรายละเอียด"}
            titleStyle={{ color: "black", fontWeight: "600" }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
              height: 45
            }}
            
          />
      </View>
    </View>
  );
};

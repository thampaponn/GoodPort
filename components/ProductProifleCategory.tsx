import { Card, Chip } from "@rneui/themed";
import { View, Text } from "react-native";

export const ProductProfileCategory = ({ data }) => {
  return (
    <Card
      containerStyle={{
        paddingHorizontal: 10,
        padding: 0,
        marginVertical: 0,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {data.image.profileImage ? (
          <Card.Image
            style={{
              marginTop: 15,
              marginBottom: 10,
              height: 50,
              width: 50,
              borderRadius: 100,
            }}
            source={{ uri: data.image.profileImage }}
          />
        ) : (
          <Card.Image
            style={{
              marginTop: 15,
              marginBottom: 10,
              height: 50,
              width: 50,
              borderRadius: 100,
            }}
            source={require("../assets/placeholder.png")}
          />
        )}

        <View style={{ marginLeft: 10 }}>
          <Text>{data.fname + " " + data.lname}</Text>
          <Chip
            containerStyle={{ marginTop: 5 }}
            title={data.role}
            color="success"
            size="sm"
          />
        </View>
      </View>
    </Card>
  );
};

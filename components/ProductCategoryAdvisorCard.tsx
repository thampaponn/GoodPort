import { Chip, Icon } from "@rneui/themed";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export const ProductCategoryAdvisorCard = ({
  navigation,
  product,
  user,
  me,
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D4D4D4",
        marginTop: 10,
        marginHorizontal: 15,
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
        {user.image.profileImage ? (
          <Image
            style={{
              margin: 15,
              height: 50,
              width: 50,
              borderRadius: 100,
            }}
            source={{ uri: user.image.profileImage }}
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
          <Text style={{ marginBottom: 5 }}>
            {product.owner.fname + " " + product.owner.lname}
          </Text>
          <Chip title="advisor" type="outline" size="sm" />
        </View>
        {me._id === product.owner.userId && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("editPostAdivsor", {
                user: me,
                product: product,
              })
            }
          >
            <Icon
              name="edit"
              color={"black"}
              style={{ marginRight: 10, color: "black" }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ margin: 15 }}>
        <Text>{product.detail}</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {product.image ? (
            <Image
              style={{
                margin: 15,
                height: 150,
                width: 150,
              }}
              source={{ uri: product.image }}
            />
          ) : (
            <Image
              style={{
                margin: 15,
                height: 150,
                width: 150,
              }}
              source={require("../assets/placeholder.png")}
            />
          )}
        </View>
        <Text style={{ textAlign: "right", color: "#AEAEAE" }}>
          created {product.createAt}
        </Text>
      </View>
    </View>
  );
};

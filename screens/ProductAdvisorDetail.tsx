import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, Chip, Input } from "@rneui/themed";
import axios from "axios";
import Constants from "expo-constants";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { Userjwt } from "../types/userjwt";

const ProductAdvisorDetail = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  const [comment, setComment] = useState<any>(null);
  const [me, setMe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);

  const handleSubmit = async () => {
    const reqBody = {
      userId: me._id,
      image: "",
      fname: me.fname,
      lname: me.lname,
      detail: comment,
    };
    await axios.post(
      `${Constants.expoConfig.extra.API_URL}/post-advisor/addComment/${data._id}`,
      reqBody
    );
    setComment("");
  };

  const fetchOriginalPost = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded: { sub: Userjwt } = jwtDecode(token);
      const user = decoded.sub;
      setMe(user);

      const userData = await axios.post(
        `${Constants.expoConfig.extra.API_URL}/post-advisor/${data._id}`
      );
      setProduct(userData.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []); //TO DO product

  useEffect(() => {
    fetchOriginalPost();
  }, [fetchOriginalPost]);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      {!loading && (
        <ScrollView>
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card containerStyle={{ borderRadius: 8 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}
              >
                {product.owner.fname + " " + product.owner.lname}
              </Text>
              <Chip
                title={"Advisor"}
                size={"sm"}
                color={"success"}
                containerStyle={{ marginTop: 20 }}
              />
              <Text style={{ marginTop: 20, fontSize: 15 }}>{data.detail}</Text>
              {data.image ? (
                <Image
                  style={{
                    margin: 15,
                    height: 250,
                    width: 250,
                  }}
                  source={{
                    uri: data.image,
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
            </Card>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
                fontWeight: "800",
              }}
            >
              ความคิดเห็น
            </Text>
            <ScrollView style={{ height: 300 }}>
              {product.comments.map((comment, index) => (
                <Card key={index} containerStyle={{ borderRadius: 8 }}>
                  <View>
                    <Text style={{ marginBottom: 5, fontWeight: "800" }}>
                      {comment.fname + " " + comment.lname}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#ECF2EC",
                        padding: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Text>{comment.detail}</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </ScrollView>
            <Input
              style={{
                borderRadius: 5,
                borderColor: "#AEAEAE",
                borderWidth: 1,
                marginTop: 6,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={setComment}
              value={comment}
            />
            <Button
              onPress={() => handleSubmit()}
              title={"แสดงความคิดเห็น"}
              titleStyle={{ fontSize: 18, fontWeight: "600" }}
              buttonStyle={{
                borderRadius: 8,
                backgroundColor: "#3444A8",
                borderWidth: 1,
                borderColor: "#ECF2EC",
                height: 45,
              }}
            />
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductAdvisorDetail;

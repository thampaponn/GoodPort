import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCategoryPostCard } from "../components/ProductCategoryPostCard";
import { ProductProfileCategory } from "../components/ProductProifleCategory";
import Constants from "expo-constants";
import { Userjwt } from "../types/userjwt";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/themed";

const ProductCategory = ({ navigation, route }) => {
  const { data, category } = route.params;
  const [productAll, setProductAll] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const response = await axios.get(
          `${Constants.expoConfig.extra.API_URL}/post/category/${category}/${data._id}`
        );

        const token = await AsyncStorage.getItem("token");
        const decoded: { sub: Userjwt } = jwtDecode(token);
        const user = decoded.sub;
        setMe(user);

        setProductAll(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    retrieveToken();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView>
        <View>
          <ProductProfileCategory data={data} />
          {!loading && (
            <View>
              {productAll.map((product: any, index: number) => (
                <ProductCategoryPostCard
                  key={index}
                  product={product}
                  navigation={navigation}
                  user={data._id}
                  me={me._id}
                />
              ))}
              {productAll.length === 0 && (
                <Card>
                  <Text style={{ textAlign: "center" }}>ไม่พบเนื้อหา</Text>
                </Card>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductCategory;

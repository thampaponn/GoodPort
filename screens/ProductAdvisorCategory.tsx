import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductProfileCategory } from "../components/ProductProifleCategory";
import Constants from "expo-constants";
import { ProductCategoryAdvisorCard } from "../components/ProductCategoryAdvisorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Userjwt } from "../types/userjwt";
import { Card } from "@rneui/themed";

const ProductAdvisorCategory = ({ route, navigation }) => {
  const { data } = route.params;
  const [productAll, setProductAll] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [me, setMe] = useState<any>(null);
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const response = await axios.get(
          `${Constants.expoConfig.extra.API_URL}/post-advisor/getByUserId/${data._id}`
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
      <SafeAreaView>
        <ScrollView>
          <View>
            <ProductProfileCategory data={data} />
            {!loading && (
              <View style={{ paddingTop: 10 }}>
                {productAll.map((product: any, index: number) => (
                  <ProductCategoryAdvisorCard
                    navigation={navigation}
                    key={index}
                    product={product}
                    user={data}
                    me={me}
                  />
                ))}
              </View>
            )}
            {!loading && productAll.length === 0 && (
              <Card>
                <Text style={{ textAlign: "center" }}>ไม่พบเนื้อหา</Text>
              </Card>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductAdvisorCategory;

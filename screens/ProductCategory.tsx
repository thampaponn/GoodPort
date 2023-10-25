import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCategoryPostCard } from "../components/ProductCategoryPostCard";
import { ProductProfileCategory } from "../components/ProductProifleCategory";
import Constants from "expo-constants";

const ProductCategory = ({ navigation, route }) => {
  const { data, category } = route.params;
  const [productAll, setProductAll] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const response = await axios.get(
          `${Constants.expoConfig.extra.API_URL}/post/category/${category}/${data._id}`
        );

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
              <View>
                {productAll.map((product: any, index: number) => (
                  <ProductCategoryPostCard
                    key={index}
                    product={product}
                    navigation={navigation}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProductCategory;

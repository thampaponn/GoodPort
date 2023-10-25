import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductProfileCategory } from "../components/ProductProifleCategory";
import Constants from "expo-constants";
import { ProductCategoryAdvisorCard } from "../components/ProductCategoryAdvisorCard";

const ProductAdvisorCategory = ({ route }) => {
  const { data } = route.params;
  const [productAll, setProductAll] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const response = await axios.get(
          `${Constants.expoConfig.extra.API_URL}/post-advisor/getByUserId/${data._id}`
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
              <View style={{paddingTop:10}}>
                {productAll.map((product: any, index: number) => (
                  <ProductCategoryAdvisorCard
                    key={index}
                    product={product}
                    user={data}
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

export default ProductAdvisorCategory;

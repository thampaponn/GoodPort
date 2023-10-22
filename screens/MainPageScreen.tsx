import { Button, Card, CheckBox, Icon, Input } from "@rneui/themed";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { post } from "../types/post";
import { PostCategory } from "../types/postCategory";
import Constants from "expo-constants";

type CategoryData = { [key: string]: boolean };

const MainPageScreen = ({ navigation }) => {
  const [originalPost, setOriginalPost] = useState<post[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const fetchOriginalPost = useCallback(async () => {
    try {
      const response = await axios.get(`${Constants.expoConfig.extra.API_URL}/post/last-7-days`);
      setOriginalPost(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    fetchOriginalPost();
  }, [fetchOriginalPost]);

  const categoryMockup: string[] = [
    "activity",
    "internship",
    "volunteer",
    "learning",
    "other",
  ];

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    categoryMockup.map(() => false)
  );
  const objFilterData: CategoryData[] = categoryMockup.map(
    (category, index) => {
      return { [category]: checkboxStates[index] };
    }
  );

  const toggleCheckbox = (index: number) => {
    const newCheckboxStates: boolean[] = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const areAllDataFalse: boolean = objFilterData.every(
    (categoryObj) => Object.values(categoryObj)[0] === false
  );

  const filteredPosts: post[] = areAllDataFalse
    ? originalPost
    : originalPost.filter((post: post) => {
        const postCategory: PostCategory = post.category;
        const categoryData: CategoryData = objFilterData.find(
          (categoryObj) => categoryObj[postCategory] !== undefined
        );
        const isTitleMatched = post.nameTh
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
        return categoryData && categoryData[postCategory] && isTitleMatched;
      });

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ScrollView>
        <Card
          containerStyle={{ borderRadius: 20, marginTop: 10, paddingBottom: 0 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}>
            ประเภทโครงงาน
          </Text>
          <View style={{ marginTop: 5 }}>
            {categoryMockup.map((data, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  checked={checkboxStates[index]}
                  onPress={() => toggleCheckbox(index)}
                  size={20}
                  containerStyle={{ padding: 0 }}
                  checkedColor="black"
                />
                <Text>{data}</Text>
              </View>
            ))}
            <Input
              containerStyle={{}}
              style={{
                borderRadius: 5,
                borderColor: "#AEAEAE",
                borderWidth: 1,
                marginTop: 10,
                paddingHorizontal:15
              }}
              disabled={areAllDataFalse}
              placeholder={"กรุณากรอกคำค้นหา"}
              onChangeText={setSearchKeyword}
              value={searchKeyword}
            />
          </View>
        </Card>
        <Button
              onPress={() =>fetchOriginalPost()}
              title={"รีเฟรส"}
              buttonStyle={{
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: "#81ADC8",
                width:"40%",
                marginRight:20,
                alignSelf:"flex-end"
              }}
              icon={
                <Icon
                  name="refresh"
                  color={"white"}
                  style={{ marginRight: 10, color: "white" }}
                />
              }
            />
        <View style={{ marginBottom: 20 }}>
          {filteredPosts.map((post: post, index: number) => (
            <ProductCard
              key={index}
              image={post.image || ""}
              name={post.nameTh}
              category={post.category}
              owner={post.owner}
              advisor={post.advisor}
              id={post._id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainPageScreen;

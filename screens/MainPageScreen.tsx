import { Card, CheckBox } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { post } from "../types/post";
import { PostCategory } from "../types/postCategory";

type CategoryData = { [key: string]: boolean };

const MainPageScreen = () => {
  const [originalPost, setOriginalPost] = useState<post[]>([]);
  useEffect(() => {
    axios
      .get(`http://10.72.7.37:3000/post`)
      .then((response) => {
        setOriginalPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  const objFilterData:CategoryData[] = categoryMockup.map((category, index) => {
    return { [category]: checkboxStates[index] };
  });

  const toggleCheckbox = (index: number) => {
    const newCheckboxStates:boolean[] = [...checkboxStates];
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
        return categoryData && categoryData[postCategory];
      });

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ScrollView>
        <Card containerStyle={{ borderRadius: 20 }}>
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
          </View>
        </Card>

        {filteredPosts.map((post: post, index: number) => (
          <ProductCard
            key={index}
            image={post.image || ""}
            name={post.nameTh}
            category={post.category}
            owner={post.owner}
            advisor={post.advisor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MainPageScreen;

import { Button, Card, CheckBox, Icon, Input, Chip } from "@rneui/themed";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { post } from "../types/post";
import { PostCategory } from "../types/postCategory";
import Constants from "expo-constants";
import { ProductAdvisorCard } from "../components/ProductAdvisorCard";
import Header from "../components/Header";
import { Userjwt } from "../types/userjwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { UserRole } from "../types/role";

type CategoryData = { [key: string]: boolean };

const MainPageScreen = ({ navigation }) => {
  const [originalPost, setOriginalPost] = useState<post[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [postAdvisor, setPostAdvisor] = useState<any>(null);
  const [me, setMe] = useState<any>(null);

  const fetchOriginalPost = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded: { sub: Userjwt } = jwtDecode(token);
      const user = decoded.sub;

      const userData = await axios.post(
        `${Constants.expoConfig.extra.API_URL}/user/${decoded.sub._id}`
      );

      setMe(userData.data);

      const response = await axios.get(
        `${Constants.expoConfig.extra.API_URL}/post/last-7-days`
      );
      setOriginalPost(response.data);
      const res = await axios.get(
        `${Constants.expoConfig.extra.API_URL}/post-advisor/`
      );
      setPostAdvisor(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      <Header />
      <ScrollView>
        <Card
          containerStyle={{ borderRadius: 20, marginTop: 10, paddingBottom: 0 }}
        >
          <Text style={{ fontSize: 25, fontWeight: "600", marginLeft: 10 }}>
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
              inputContainerStyle={{
                borderColor: "transparent",
              }}
              style={{
                borderRadius: 5,
                borderColor: "#AEAEAE",
                borderWidth: 1,
                marginTop: 10,
                paddingHorizontal: 15,
              }}
              disabled={areAllDataFalse}
              placeholder={"กรุณากรอกคำค้นหา"}
              onChangeText={setSearchKeyword}
              value={searchKeyword}
            />
          </View>
        </Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 30,
          }}
        >
          {!loading && me.role !== UserRole.Visitor && (
            <Button
              titleStyle={{ color: "black" }}
              onPress={() => setToggle(!toggle)}
              title={toggle ? "อาจารย์" : "ผลงาน"}
              buttonStyle={{
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: "white",
                width: 150,
                borderWidth: 1,
                borderColor: "black",
              }}
              icon={
                <Icon
                  name="keyboard-arrow-down"
                  color={"black"}
                  style={{ marginRight: 10, color: "black" }}
                />
              }
            />
          )}

          <Button
            onPress={() => fetchOriginalPost()}
            title={"รีเฟรช"}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "#3C424D",
              width: 150,
            }}
            icon={
              <Icon
                name="refresh"
                color={"white"}
                style={{ marginRight: 10, color: "white" }}
              />
            }
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          {toggle &&
            filteredPosts.map((post: post, index: number) => (
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

        {!toggle && !loading && (
          <View>
            {postAdvisor.map((post: any, index: number) => (
              <ProductAdvisorCard
                key={index}
                profileImage={post.owner.image}
                name={post.owner.fname + " " + post.owner.lname}
                detail={post.detail}
                imagePost={post.image}
                createAt={post.createAt}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MainPageScreen;

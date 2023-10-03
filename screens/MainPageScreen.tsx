import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { ProudctFilter } from "../components/ProductFilter";

const MainPageScreen = () => {
  const PostMockup = [
    {
      img: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
      name: "Project #1",
      category: "การเรียน",
      owner: "ธนาธิป สิงหานนท์",
      professor: "จารย์เก่ง",
    },
    {
      img: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
      name: "Project #2",
      category: "การเรียน",
      owner: "ธนาธิป สิงหานนท์",
      professor: "จารย์เก่ง",
    },
    {
      img: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
      name: "Project #3",
      category: "การเรียน",
      owner: "ธนาธิป สิงหานนท์",
      professor: "จารย์เก่ง",
    },
    {
      img: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
      name: "Project #4",
      category: "การเรียน",
      owner: "ธนาธิป สิงหานนท์",
      professor: "จารย์เก่ง",
    },
  ];
  const categoryMockup = [
    {
      name: "การเรียน",
    },
    {
      name: "กีฬา",
    },
    {
      name: "สหกิจ",
    },
    {
      name: "จิตอาสา",
    },
    {
      name: "อื่น ๆ",
    },
  ];
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ScrollView>
        <ProudctFilter type={categoryMockup} />
        {PostMockup.map((post, key) => (
          <ProductCard key={key}
            image={post.img}
            name={post.name}
            category={post.category}
            owner={post.owner}
            advisor={post.professor}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPageScreen;

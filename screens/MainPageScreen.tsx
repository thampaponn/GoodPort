import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";
import { useState } from "react";

const MainPage = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const postArray = [
        {
            img: '../assets/icon.png',
            name: 'Project #1',
            category: 'การเรียน',
            owner: 'ธนาธิป สิงหานนท์',
            professor: 'จารย์เก่ง'
        },
        {
            name: 'Project #2',
            category: 'การเรียน',
            owner: 'ธนาธิป สิงหานนท์',
            professor: 'จารย์เก่ง'
        },
        {
            name: 'Project #3',
            category: 'การเรียน',
            owner: 'ธนาธิป สิงหานนท์',
            professor: 'จารย์เก่ง'
        },
        {
            name: 'Project #4',
            category: 'การเรียน',
            owner: 'ธนาธิป สิงหานนท์',
            professor: 'จารย์เก่ง'
        },
    ]
    const categoryArray = [
        {
            name: "การเรียน"
        },
        {
            name: "กีฬา"
        },
        {
            name: "สหกิจ"
        },
        {
            name: "จิตอาสา"
        },
        {
            name: "อื่น ๆ"
        },
    ]
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            // Category is already selected, so remove it
            setSelectedCategories((prevSelected) =>
                prevSelected.filter((item) => item !== category)
            );
        } else {
            // Category is not selected, so add it
            setSelectedCategories((prevSelected) => [...prevSelected, category]);
        }
    };
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                {/* <View style={styles.centeredContainer}>
                    <Image
                        style={{ marginBottom: 30 }}
                        source={require('../assets/Logo.png')}
                    />
                </View> */}
                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                    <View style={styles.leftContainer}>
                        {categoryArray.map((item, key) => <TouchableOpacity
                            key={key}
                            onPress={() => toggleCategory(item.name)}
                            style={styles.checkboxContainer}
                        >
                            <View style={styles.checkbox}>
                                {selectedCategories.includes(item.name) && (
                                    <Image
                                        source={require("../assets/checkmark.png")}
                                        style={styles.checkmark}
                                    />
                                )}
                            </View>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>)}
                    </View>
                    {postArray.map((item, key) => <View style={styles.leftContainer}>
                        <View style={styles.flexContainer}>
                            <Image
                                style={{ marginBottom: 30 }}
                                source={require('../assets/Logo.png')}
                            />
                        </View>
                        <View style={styles.flexContainer}>
                            <Text style={styles.projectName}>{item.name}</Text>
                        </View>
                        <Text style={styles.fontSm}>ประเภทของโครงงาน : {item.category}</Text>
                        <Text style={styles.fontSm}>เจ้าของโครงงาน : {item.owner}</Text>
                        <Text style={styles.fontSm}>อาจารย์ที่ปรึกษา : {item.professor}</Text>
                        <ButtonUi title={"แสดงรายละเอียด"} />
                    </View>)}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        marginTop: 50,
        paddingLeft: 40,
        paddingRight: 40,
    },
    flexContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        justifyContent: 'center',
    },
    leftContainer: {
        marginTop: 15,
        marginBottom: 5,
        justifyContent: 'center',
        borderWidth: 1, // Border width
        borderColor: '#AEAEAE', // Border color
        borderRadius: 5, // Border radius
        padding: 10, // Optional: Add padding to the content inside the container
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "flex-end", // Align children to the right side
        marginTop: 20,
        width: 300,
        maxWidth: 300,
    },
    textInput: {
        width: 307,
        height: 42,
        backgroundColor: "#F0F0F0",
        borderColor: "#AEAEAE",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 6,
    },
    bigTextInput: {
        width: 307,
        height: 130,
        backgroundColor: "#F0F0F0",
        borderColor: "#AEAEAE",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 6,
    },
    centeredContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    signUpText: {
        fontSize: 24,
        fontWeight: 'normal',
        marginTop: 20,
    },
    fontSm: {
        fontSize: 14,
        marginTop: 15
    },
    projectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0098DA'
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderColor: "#AEAEAE",
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
      },
      checkmark: {
        width: 16,
        height: 16,
      },
});

export default MainPage;

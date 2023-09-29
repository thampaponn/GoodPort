import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { ButtonUi } from "../components/ui/Button";
import { InputForm } from "../components/ui/InputForm";

const StudentMain = () => {

    const namearray = [
        {
            name: "คำนำหน้าขื่อ *"
        }, {
            name: "อีเมล *"
        }, {
            name: "อาชีพ *"
        }, {
            name: "บริษัท / สถานศึกษา *"
        }, {
            name: "หมายเลขติดต่อบริษัท *"
        }]

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.centeredContainer}>
                    <Image
                        style={{ marginBottom: 30 }}
                        source={require('../assets/Logo.png')}
                    />
                </View>
                <ScrollView contentContainerStyle={{ justifyContent: 'center'}}>
                    {namearray.map((item, key) => <View style={styles.leftContainer}>
                        {/* <Image /> */}
                        <Text style={styles.fontSm}>ประเภทของโครงงาน : </Text>
                        <Text style={styles.fontSm}>เจ้าของโครงงาน : </Text>
                        <Text style={styles.fontSm}>อาจารย์ที่ปรึกษา : </Text>
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
        paddingBottom: 20,
        marginTop: 100,
        paddingLeft: 40,
        paddingRight: 40
    },
    flexContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        justifyContent: 'center',
    },
    leftContainer: {
        marginTop: 15,
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
        fontWeight: "800",
        marginTop: 20,
    },
    fontSm: {
        fontSize: 14,
        marginTop: 15
    }
});

export default StudentMain;

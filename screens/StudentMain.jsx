import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableOpacity } from "react-native";

const StudentMain = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        alignItems: "center",
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row", // Arrange children horizontally
        justifyContent: "flex-end", // Align children to the right side
        marginTop: 20,
        width: 300,
        maxWidth: 300,
    },
    button: {
        fontSize: 12,
        backgroundColor: '#81ADC8',
        width: 80,
        height: 30,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16, // Adjust the font size as needed
        color: "#F8F2DC", // Text color
        lineHeight: 30, // Vertical alignment
        textAlign: 'center'
    },
});

export default StudentMain;

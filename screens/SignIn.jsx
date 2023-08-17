import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableOpacity, ScrollView } from "react-native";

const SignIn = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={{ alignItems: 'center', fontSize: 24, fontWeight: 800 }}>Sign In</Text>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Username</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Password</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 23 }}>
                    <Text style={{ fontSize: 14 }}>don't have an account? </Text>
                    <TouchableOpacity style={{ fontSize: 14 }}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row", // Arrange children horizontally
        justifyContent: "flex-end", // Align children to the right side
        marginTop: 20,
        width: 300,
        maxWidth: 300,
    },
    submitButton: {
        marginTop: 52,
        justifyContent: 'center',
        fontSize: 12,
        backgroundColor: '#81ADC8',
        width: 307,
        height: 42,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20, // Adjust the font size as needed
        color: "#F8F2DC", // Text color
        lineHeight: 30, // Vertical alignment
        textAlign: 'center'
    },
    textInput: {
        width: 307,
        height: 42,
        backgroundColor: '#F0F0F0',
        borderColor: '#AEAEAE',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 6
    },
    bigTextInput: {
        width: 307,
        height: 130,
        backgroundColor: '#F0F0F0',
        borderColor: '#AEAEAE',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 6
    },
    formText: {
        fontSize: 16,
        alignItems: 'center'
    }
});

export default SignIn;

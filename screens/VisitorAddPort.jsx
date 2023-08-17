import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Keyboard, TouchableOpacity, ScrollView } from "react-native";

const VisitorAddPort = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Name</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Project's Type</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Professor Aprroval</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Description</Text>
                    <TextInput style={styles.bigTextInput} />
                </View>
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.formText}>Upload file(s)</Text>
                    <TextInput style={styles.textInput} />
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
        alignItems: 'flex-start',
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
        marginVertical: 34,
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

export default VisitorAddPort;

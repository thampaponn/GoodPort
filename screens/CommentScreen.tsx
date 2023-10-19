import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@rneui/themed';
import { Ionicons } from "@expo/vector-icons";

const infoArray = [
    {
        name: "ธนาธิป เกย์โบ๊ต",
        comment: "อยากเป็นเกย์ครับ"
    },
    {
        name: "ธนาธิป เกย์โบ๊ต",
        comment: "อยากเป็นเกย์ครับ"
    },
    {
        name: "ธนาธิป เกย์โบ๊ต",
        comment: "อยากเป็นเกย์ครับ"
    },
    {
        name: "ธนาธิป เกย์โบ๊ต",
        comment: "อยากเป็นเกย์ครับ"
    },
    {
        name: "ธนาธิป เกย์โบ๊ต",
        comment: "อยากเป็นเกย์ครับ"
    },
];

export default function CommentScreen() {
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: '100%', height: 50, justifyContent: 'center', borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
                    <Text style={{ textAlign: 'center' }}>ความคิดเห็น</Text>
                </View>
                <Divider width={2} color="#AEAEAE" />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 70 }}>
                        {infoArray.map((info, index) => (
                            <View key={index} style={{ width: '95%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', borderColor: '#AEAEAE', borderWidth: 2, borderRadius: 5, marginTop: 10 }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 10 }}>
                                    <Ionicons style={{ textAlign: 'center', padding: 15 }} name={'person'} size={30} color="black" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, textAlign: 'left', margin: 3, fontWeight: 'bold' }}>{info.name}</Text>
                                    <Text style={{ fontSize: 14, textAlign: 'left', margin: 3 }}>{info.comment}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Aa"
                    />
                    <TouchableOpacity>
                        <Ionicons style={{ textAlign: 'center', marginLeft: 18 }} name="send" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        flexDirection: "row"
    },
    textInput: {
        width: 307,
        height: 42,
        backgroundColor: '#F0F0F0',
        borderColor: '#AEAEAE',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
    },
});
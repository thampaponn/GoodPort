import { Text, SafeAreaView, Alert, Image } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../config";
import React, { useState } from "react";

const AddPortScreen = ({ navigation }) => {
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadMedia = async () => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response as Blob);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);
      setUploading(false);
      Alert.alert("Photo Uploaded");
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <Card containerStyle={{ borderRadius: 20, padding: 25 }}>
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          ชื่อโครงงานภาษาไทย
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          ชื่อโครงงานภาษาอังกฤษ
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          ประเภทโครงงาน
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          จุดประสงค์
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          ที่มา
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          รายละเอียด
        </Text>
        <Input
          style={{
            borderRadius: 5,
            borderColor: "#AEAEAE",
            borderWidth: 1,
            marginTop: 6,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <Button
          onPress={() => {
            pickImage();
          }}
          title={"อัพโหลด"}
          buttonStyle={{
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: "#81ADC8",
          }}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}
        <Button
          onPress={() => {
            uploadMedia();
          }}
          title={"test"}
          buttonStyle={{
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: "#81ADC8",
          }}
        />
      </Card>
    </SafeAreaView>
  );
};

export default AddPortScreen;

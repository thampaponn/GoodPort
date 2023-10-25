import { Button, Card, Dialog, Icon, Input } from "@rneui/themed";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { User } from "../../types/user";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../config";
import axios from "axios";
import Constants from "expo-constants";

const EditProfile = ({ navigation, route }) => {
  const { user } = route.params;
  const [image, setImage] = useState<any>(user.image.profileImage ?? null);
  const [filename, setFilename] = useState<string>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    defaultValues: user,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setChecked(true);
    }
    setFilename(
      `https://firebasestorage.googleapis.com/v0/b/goodport-cb0e6.appspot.com/o/${result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      )}?alt=media`
    );
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      if (!image || !checked) {
        return;
      }
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
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (image) {
      await uploadMedia();
    }
    const reqBody = {
      ...data,
      image: {
        profileImage: checked ? filename : user.image.profileImage,
      },
    };
    console.log(reqBody);
    await axios.put(
      `${Constants.expoConfig.extra.API_URL}/user/${user._id}`,
      reqBody
    );
    navigation.navigate("Profile");
  };
  return (
    <SafeAreaView style={{backgroundColor: "#FFFFFF"}}>
      <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
        <Dialog isVisible={uploading}>
          <Dialog.Loading />
        </Dialog>
        <Card containerStyle={{ borderRadius: 8 }}>
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ชื่อ
          </Text>
          <Controller
            name="fname"
            control={control}
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.fname && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.fname.message}
            </Text>
          )}

          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            นามสกุล
          </Text>
          <Controller
            name="lname"
            control={control}
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.lname && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.lname.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            หมายเลขโทรศัพท์
          </Text>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.phone && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.phone.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            อีเมลล์
          </Text>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.phone && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.phone.message}
            </Text>
          )}
          <Button
            onPress={() => {
              pickImage();
            }}
            title={"อัพโหลดรูป"}
            titleStyle={{ color: "black" }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
              height: 45
            }}
            icon={
              <Icon
                name="cloud-upload"
                color={"black"}
                style={{ marginRight: 10, color: "white" }}
              />
            }
          />
          <View style={{ width: "100%", paddingHorizontal: 30, marginTop: 20 }}>
            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ width: 250, height: 250 }}
                />
                <Text
                  onPress={() => setImage(null)}
                  style={{
                    position: "absolute",
                    right: 0,
                    paddingHorizontal: 5,
                    backgroundColor: "#BE2C35",
                    color: "white",
                    borderRadius: 100,
                  }}
                >
                  X
                </Text>
              </View>
            )}
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            title={"Submit"}
            titleStyle={{ fontSize: 18, fontWeight: "600" }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "#3444A8",
              borderWidth: 1,
              borderColor: "#ECF2EC",
              height: 45,
            }}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

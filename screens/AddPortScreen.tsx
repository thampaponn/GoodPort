import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { Button, Card, Icon, Input, Dialog } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../config";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { post } from "../types/post";
import axios from "axios";
import { PostStatus } from "../types/postStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { zPost } from "../types/zod/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Userjwt } from "../types/userjwt";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";
import { PostCategory } from "../types/postCategory";
import { User } from "../types/user";

const AddPortScreen = ({ navigation }) => {
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<PostCategory>(
    PostCategory.learning
  );
  const [selectedValue2, setSelectedValue2] = useState<any>(null);
  const [userConfirm, setUserConfirm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${Constants.expoConfig.extra.API_URL}/user/with-roles`)
      .then((response) => {
        setUserConfirm(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userConfirm]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<post>({
    resolver: zodResolver(zPost),
  });

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded: { sub: Userjwt } = jwtDecode(token);
        const user = decoded;
        if (user) {
          setValue("owner.userId", decoded.sub._id);
          setValue("owner.fname", decoded.sub.fname);
          setValue("owner.lname", decoded.sub.lname);
          setValue("owner.email", decoded.sub.email);
        }
      } catch (error) {
        navigation.navigate("signin");
        console.log("เกิดข้อผิดพลาดในการดึง token:", error);
      }
    };
    retrieveToken();
  }, []);

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
    setFilename(
      `https://firebasestorage.googleapis.com/v0/b/goodport-cb0e6.appspot.com/o/${result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      )}?alt=media`
    );
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      if (!image) {
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
    const advisorConfirm = userConfirm.find(
      (obj) => obj._id === selectedValue2
    );
    setValue("category", selectedValue);
    if (filename) {
      await uploadMedia();
    }
    try {
      const bodyReq = {
        ...data,
        image: filename,
        status: PostStatus.submited,
        advisor: {
          email: advisorConfirm["email"],
          fname: advisorConfirm["fname"],
          lname: advisorConfirm["lname"],
        },
      };
      await axios.post(`${Constants.expoConfig.extra.API_URL}/post`, bodyReq);
      Alert.alert("โพสต์สำเร็จ");
      navigation.navigate("productmain");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <Dialog isVisible={loading}>
          <Dialog.Loading />
        </Dialog>
        <Card
          containerStyle={{ borderRadius: 20, padding: 25, marginBottom: 50 }}
        >
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ชื่อโครงงานภาษาไทย*
          </Text>
          <Controller
            name="nameTh"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.nameTh && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.nameTh.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ชื่อโครงงานภาษาอังกฤษ*
          </Text>
          <Controller
            name="nameEn"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.nameEn && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.nameEn.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ประเภทโครงงาน*
          </Text>
          <Controller
            name="category"
            control={control}
            defaultValue={selectedValue}
            render={({ field }) => (
              <View
                style={{
                  width: 307,
                  borderWidth: 1,
                  borderColor: "#AEAEAE",
                  borderRadius: 5,
                  marginBottom: 20,
                  marginHorizontal: 10,
                }}
              >
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(val) => {
                    field.onChange(val);
                    setSelectedValue(val);
                  }}
                >
                  <Picker.Item label="การเรียน" value={PostCategory.learning} />
                  <Picker.Item label="กีฬา" value={PostCategory.activity} />
                  <Picker.Item label="สหกิจ" value={PostCategory.internship} />
                  <Picker.Item label="จิตอาสา" value={PostCategory.volunteer} />
                  <Picker.Item label="อื่นๆ" value={PostCategory.other} />
                </Picker>
              </View>
            )}
          />

          {errors.category && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.category.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            จุดประสงค์
          </Text>
          <Controller
            name="objective"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                multiline={true}
                numberOfLines={4}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.objective && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.objective.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ที่มา
          </Text>
          <Controller
            name="source"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                multiline={true}
                numberOfLines={4}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.source && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.source.message}
            </Text>
          )}
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            รายละเอียด
          </Text>
          <Controller
            name="detail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                style={{
                  borderRadius: 5,
                  borderColor: "#AEAEAE",
                  borderWidth: 1,
                  marginTop: 6,
                  paddingHorizontal: 15,
                }}
                multiline={true}
                numberOfLines={4}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
          {errors.detail && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.detail.message}
            </Text>
          )}

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
            icon={
              <Icon
                name="cloud-upload"
                color={"white"}
                style={{ marginRight: 10, color: "white" }}
              />
            }
          />
          <Text style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}>
            รูปขนาดไม่เกิน 10 MB
          </Text>
          <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
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
          <View
            style={{
              width: 307,
              borderWidth: 1,
              borderColor: "#AEAEAE",
              borderRadius: 5,
              marginBottom: 20,
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Picker
              selectedValue={selectedValue2}
              onValueChange={(itemValue, index) => setSelectedValue2(itemValue)}
            >
              {loading ? (
                <Picker.Item label="Loading..." value={null} />
              ) : (
                userConfirm.map((user: any) => (
                  <Picker.Item
                    label={user.fname + " " + user.lname}
                    value={user._id}
                    key={user._id}
                  />
                ))
              )}
            </Picker>
          </View>
          <Button
            onPress={handleSubmit(onSubmit)}
            title={"Submit"}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "#81ADC8",
            }}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPortScreen;

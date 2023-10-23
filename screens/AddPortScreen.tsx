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
import * as DocumentPicker from "expo-document-picker";
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
import * as Linking from "expo-linking";
import { UserRole } from "../types/role";
import AddProductAdvisor from "../components/AddProductAdvisor";

const AddPortScreen = ({ navigation }) => {
  const [image, setImage] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploading2, setUploading2] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [filename2, setFilename2] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<PostCategory>(
    PostCategory.learning
  );
  const [me, setMe] = useState<any>(null);
  const [selectedValue2, setSelectedValue2] = useState<any>(null);
  const [userConfirm, setUserConfirm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [nameFile, setNameFile] = useState<string>("");
  useEffect(() => {
    axios
      .get(`${Constants.expoConfig.extra.API_URL}/user/with-roles`)
      .then((response) => {
        const newData = { fname: "ไม่มี", lname: "", _id: null };
        response.data.unshift(newData);
        setUserConfirm([...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

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
        const res = await axios.post(
          `${Constants.expoConfig.extra.API_URL}/user/${user.sub._id}`
        );
        setMe(res.data);
        setLoading2(false);
        if (user) {
          setValue("owner.userId", decoded.sub._id);
          setValue("owner.fname", decoded.sub.fname);
          setValue("owner.lname", decoded.sub.lname);
          setValue("owner.email", decoded.sub.email);
        }
      } catch (error) {
        setLoading2(false);
        navigation.navigate("signin");
        console.log("เกิดข้อผิดพลาดในการดึง token:", error);
      }
    };
    retrieveToken();
  }, []);

  const pickDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
    setNameFile(
      result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf("/") + 1)
    );
    setFilename2(
      `https://firebasestorage.googleapis.com/v0/b/goodport-cb0e6.appspot.com/o/er%2F${result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      )}?alt=media`
    );
  };

  const openWebsite = async () => {
    const url = filename2;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("ไม่สามารถเปิด URL นี้ได้");
    }
  };

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

  const uploadFile = async () => {
    setUploading2(true);

    try {
      if (!file) {
        return;
      }
      const { uri } = await FileSystem.getInfoAsync(file);
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

      const filename2 = file.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename2);
      await ref.put(blob);
      setUploading2(false);
      setFile(null);
    } catch (error) {
      console.error(error);
      setUploading2(false);
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
    if (file) {
      await uploadFile();
    }
    try {
      const statusProduct = advisorConfirm["_id"]
        ? PostStatus.submited
        : PostStatus.accepted;
      const bodyReq = {
        ...data,
        image: filename,
        file: filename2,
        status: statusProduct,
        advisor: {
          email: advisorConfirm["email"],
          fname: advisorConfirm["fname"],
          lname: advisorConfirm["lname"],
          userId: advisorConfirm["_id"],
        },
      };

      const response = await axios.post(
        `${Constants.expoConfig.extra.API_URL}/post`,
        bodyReq
      );

      setFilename("");
      const bodyAleart = {
        owner: {
          userId: response.data.owner.userId,
          fname: response.data.owner.fname,
          lname: response.data.owner.lname,
        },
        postId: response.data._id,
        postTitle: response.data.nameTh,
        postCategory: response.data.category,
        advisorId: response.data.advisor.userId,
        advisorFname: response.data.advisor.fname,
        advisorLname: response.data.advisor.lname,
        detail: response.data.status,
      };

      await axios.post(
        `${Constants.expoConfig.extra.API_URL}/alert`,
        bodyAleart
      );
      setValue("nameTh", "");
      setValue("nameEn", "");
      setValue("objective", "");
      setValue("detail", "");
      setValue("source", "");
      Alert.alert("โพสต์สำเร็จ");
      navigation.navigate("productmain");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#FFFFFF", width: "100%", height: "100%" }}
    >
      {!loading2 && !loading && me.role !== UserRole.Advisor && (
        <ScrollView>
          <Dialog isVisible={loading || uploading || uploading2}>
            <Dialog.Loading />
          </Dialog>
          <Card
            containerStyle={{ borderRadius: 20, padding: 25, marginBottom: 50 }}
          >
            <Text
              style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
            >
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
                    paddingHorizontal: 10,
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
            <Text
              style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
            >
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
                    paddingHorizontal: 10,
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
            <Text style={{ fontSize: 16, alignItems: "center" }}>
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
                    marginTop: 10,
                  }}
                >
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedValue(val);
                    }}
                  >
                    <Picker.Item
                      label="การเรียน"
                      value={PostCategory.learning}
                    />
                    <Picker.Item label="กีฬา" value={PostCategory.activity} />
                    <Picker.Item
                      label="สหกิจ"
                      value={PostCategory.internship}
                    />
                    <Picker.Item
                      label="จิตอาสา"
                      value={PostCategory.volunteer}
                    />
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
            <Text
              style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
            >
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
            <Text
              style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
            >
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
            <Text
              style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
            >
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
              title={"อัพโหลดรูป"}
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
            <Text
              style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
            >
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

            <View>
              <Button
                onPress={() => {
                  pickDocuments();
                }}
                title={"อัพโหลดไฟล์"}
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

              {file && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 15,
                    alignItems: "center",
                  }}
                >
                  <Icon name="attach-file" />
                  <Text>{nameFile}</Text>
                </View>
              )}
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              อาจารย์ที่ปรึกษา (ไม่มีให้ใส่ ไม่มี )
            </Text>
            <View
              style={{
                width: 307,
                borderWidth: 1,
                borderColor: "#AEAEAE",
                borderRadius: 5,
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={selectedValue2}
                onValueChange={(itemValue, index) =>
                  setSelectedValue2(itemValue)
                }
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
      )}
      {!loading2 && !loading && me.role === UserRole.Advisor && (
        <ScrollView>
          <AddProductAdvisor />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AddPortScreen;

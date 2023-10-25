import { Button, Card, Dialog, Icon, Input } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../config";
import axios from "axios";
import Constants from "expo-constants";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { post } from "../../types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { zPost } from "../../types/zod/Post";

const EditPost = ({ navigation, route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(data.image ?? null);
  const [filename, setFilename] = useState<string>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const product = data;

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<post>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (image) {
      await uploadMedia();
    }
    const reqBody = {
      ...data,
      image: checked ? filename : product.image,
      owner: product.owner,
    };
    console.log("req =>", reqBody);
    setLoading(true);
    await axios.put(
      `${Constants.expoConfig.extra.API_URL}/post/${product._id}`,
      reqBody
    );
    setLoading(false);
    navigation.navigate("Home");
  };

  console.log("data =>", data);

  return (
    <ScrollView>
      <Dialog isVisible={loading || uploading}>
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

        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          ชื่อโครงงานภาษาอังกฤษ*
        </Text>
        <Controller
          name="nameEn"
          control={control}
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

        <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
          วัตถุประสงค์
        </Text>
        <Controller
          name="objective"
          control={control}
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
        {errors.detail && (
          <Text style={{ color: "red", marginHorizontal: 10 }}>
            {errors.detail.message}
          </Text>
        )}

        <Button
          onPress={() => pickImage()}
          title={"อัพโหลดรูปภาพ"}
          titleStyle={{ color: "black" }}
          buttonStyle={{
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
          }}
          icon={
            <Icon
              name="cloud-upload"
              color={"black"}
              style={{ marginRight: 10, color: "white" }}
            />
          }
        />
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

        <Button
          onPress={handleSubmit(onSubmit)}
          title={"Submit"}
          buttonStyle={{
            marginTop: 20,
            borderRadius: 8,
            backgroundColor: "#3444A8",
            borderWidth: 1,
            borderColor: "#ECF2EC",
          }}
        />
      </Card>
    </ScrollView>
  );
};

export default EditPost;

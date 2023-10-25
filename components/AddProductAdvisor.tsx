import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { Button, Card, Icon, Input, Dialog } from "@rneui/themed";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAdvisor } from "../types/postAdvisor";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../config";
import Constants from "expo-constants";
import axios from "axios";
import { zPostAdvisor } from "../types/zod/postAdvisor";

const AddProductAdvisor = ({ user, navigation }: any) => {
  const [filename, setFilename] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<postAdvisor>({
    resolver: zodResolver(zPostAdvisor),
    defaultValues: {
      owner: {
        userId: user._id,
        image: user.image.profileImage ?? "",
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    },
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
    if (filename) {
      await uploadMedia();
    }
    const bodyReq = {
      ...data,
      image: filename,
    };
    await axios.post(
      `${Constants.expoConfig.extra.API_URL}/post-advisor`,
      bodyReq
    );
    navigation.navigate("Home");
    setFilename("");
    setValue("detail", "");
  };
  return (
    <View>
      <SafeAreaView>
        <Dialog isVisible={uploading}>
          <Dialog.Loading />
        </Dialog>
        <Card
          containerStyle={{ borderRadius: 20, padding: 25, marginBottom: 50 }}
        >
          <Text style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}>
            ประกาศ *
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
          <Text style={{ textAlign: "right", marginTop: 20, marginRight: 10 }}>
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
          <Button
            onPress={handleSubmit(onSubmit)}
            title={"Submit"}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "#75CAFF",
              borderWidth: 1,
              borderColor: "#ECF2EC",
            }}
          />
        </Card>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: 307,
    height: 42,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
    paddingHorizontal: 15,
  },
});
export default AddProductAdvisor;

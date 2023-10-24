import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { User } from "../../types/user";
import { Input, Button, Icon } from "@rneui/themed";
import { typeOfRegisterScreen } from "../../hook/typeOfRegisterScreen";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../../config";
import { transformRole } from "../../hook/transformRole";
import axios from "axios";
import { UserRole } from "../../types/role";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { zUser } from "../../types/zod/user";

type UserType = {
  id: string;
  label: string;
  value: string;
};

const SignUp = ({ navigation }) => {
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(zUser),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (filename) {
      await uploadMedia();
    }

    const role: UserRole = transformRole(selectedId);
    const bodyReq: any = {
      ...data,
      image: { studentCard: filename },
      sex: selectedValue,
      role: role,
    };
    const res: any = await axios.post(
      `${Constants.expoConfig.extra.API_URL}/user`,
      bodyReq
    );
    navigation.navigate("signin");
  };

  const { width } = useWindowDimensions();
  const typeUserRegister: UserType[] = typeOfRegisterScreen();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string>("male");

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
      Alert.alert("Photo Uploaded");
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <ScrollView style={styles.card}>
      <SafeAreaView>
        <View style={styles.screen}>
          <View style={styles.centeredContainer}>
            <Image
              style={{ marginLeft: 20, height: 125, width: width * 0.9 }}
              source={require("../../assets/Logo3.png")}
            />
            <Text style={styles.signUpText}>สมัครสมาชิก</Text>
          </View>
          <View style={{ marginTop: 10, width: 340 }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginHorizontal: 10,
              }}
            >
              {"ชื่อ"}
            </Text>
            <Controller
              name="fname"
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
            {errors.fname && (
              <Text style={{ color: "red", marginHorizontal: 10 }}>
                {errors.fname.message}
              </Text>
            )}
          </View>
          <View style={{ width: 340 }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginHorizontal: 10,
              }}
            >
              {"นามสกุล"}
            </Text>
            <Controller
              name="lname"
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
            {errors.lname && (
              <Text style={{ color: "red", marginHorizontal: 10 }}>
                {errors.lname.message}
              </Text>
            )}
          </View>
          <View style={{ width: 340 }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginHorizontal: 10,
              }}
            >
              {"ชื่อผู้ใช้"}
            </Text>
            <Controller
              name="username"
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
          </View>
          {errors.username && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.username.message}
            </Text>
          )}
          <View>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
              }}
            >
              {"เพศ"}
            </Text>
            <View
              style={{
                width: 320,
                borderWidth: 1,
                borderColor: "#AEAEAE",
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="ชาย" value="male" />
                <Picker.Item label="หญิง" value="female" />
                <Picker.Item label="อื่นๆ" value="other" />
              </Picker>
            </View>
          </View>

          <View style={{ width: 340 }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginHorizontal: 10,
              }}
            >
              {"รหัสผ่าน"}
            </Text>
            <Controller
              name="password"
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
                  secureTextEntry={true}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
            />
          </View>
          {errors.password && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.password.message}
            </Text>
          )}
          <View style={{ width: 340 }}>
            <Text
              style={{
                fontSize: 16,
                padding: 5,
                marginHorizontal: 10,
              }}
            >
              {"เบอร์โทรศัพท์"}
            </Text>
            <Controller
              name="phone"
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
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          {errors.phone && (
            <Text style={{ color: "red", marginHorizontal: 10 }}>
              {errors.phone.message}
            </Text>
          )}
          <View style={{ width: 320 }}>
            <RadioGroup
              radioButtons={typeUserRegister}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="column"
              containerStyle={{ alignItems: "flex-start" }}
            />
          </View>

          {selectedId === "1" && (
            <View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"คำนำหน้า"}
                </Text>
                <Controller
                  name="preflex"
                  control={control}
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
              </View>
              {errors.preflex && (
                <Text style={{ color: "red", marginHorizontal: 10 }}>
                  {errors.preflex.message}
                </Text>
              )}
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"email"}
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
                      }}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={{ color: "red", marginHorizontal: 10 }}>
                  {errors.email.message}
                </Text>
              )}
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"รหัสประจำตัวอาจารย์"}
                </Text>
                <Controller
                  name="job.professorId"
                  control={control}
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
              </View>

              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"มหาวิทยาลัยที่จบการศึกษา"}
                </Text>
                <Controller
                  name="information.university"
                  control={control}
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
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"ประเทศที่จบการศึกษา"}
                </Text>
                <Controller
                  name="information.graduatedFrom"
                  control={control}
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
              </View>
            </View>
          )}

          {selectedId === "2" && (
            <View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"email"}
                </Text>
                <Controller
                  name="email"
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
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"รหัสประจำตัวนักศึกษา"}
                </Text>
                <Controller
                  name="job.studentId"
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
              </View>
              <Button
                onPress={() => {
                  pickImage();
                }}
                title={"อัพโหลด"}
                titleStyle={{ color: "black", fontWeight: "600" }}
                buttonStyle={{
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: "#FFFFFF",
                  height: 45,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#090909",
                }}
                icon={
                  <Icon
                    name="cloud-upload"
                    color={"black"}
                    style={{ marginRight: 10, color: "white" }}
                  />
                }
              />

              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
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
              {!image && (
                <Text
                  style={{ textAlign: "right", marginTop: 10, marginRight: 10 }}
                >
                  รูปขนาดไม่เกิน 10 MB
                </Text>
              )}
            </View>
          )}

          {selectedId === "3" && (
            <View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"คำนำหน้า"}
                </Text>
                <Controller
                  name="preflex"
                  control={control}
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
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"email"}
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
                      }}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"อาชีพ"}
                </Text>
                <Controller
                  name="job.title"
                  control={control}
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
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"สถานที่ทำงาน/ สถานที่ศึกษา"}
                </Text>
                <Controller
                  name="information.location"
                  control={control}
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
              </View>
              <View style={{ width: 340 }}>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    marginHorizontal: 10,
                  }}
                >
                  {"เบอร์ติดต่อสถานที่ทำงาน"}
                </Text>
                <Controller
                  name="information.companyNumber"
                  control={control}
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
                      keyboardType="numeric"
                    />
                  )}
                />
              </View>
            </View>
          )}

          <View
            style={{
              marginTop: 5,
              width: 320,
              maxWidth: 320,
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                marginTop: 20,
                justifyContent: "center",
                backgroundColor: "#34448A",
                width: 320,
                height: 45,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                  lineHeight: 30,
                  textAlign: "center",
                  fontWeight: "600"
                }}
              >
                {"สมัครสมาชิก"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              justifyContent: "center",
              paddingBottom: 50,
            }}
          >
            <Text style={styles.fontSm}>สมัครสมาชิกแล้ว? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signin")}>
              <Text style={{ color: "#3444A8", fontSize: 14 }}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  fontSm: {
    fontSize: 14,
  },
  card: {
    paddingVertical: 20,
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginTop: 20,
    width: 320,
    maxWidth: 320,
  },
  textInput: {
    width: 307,
    height: 42,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
  },
  bigTextInput: {
    width: 307,
    height: 130,
    backgroundColor: "#F0F0F0",
    borderColor: "#AEAEAE",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6,
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3444A8"
  },
});

export default SignUp;

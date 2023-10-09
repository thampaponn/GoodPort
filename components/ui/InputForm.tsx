import { Text, StyleSheet, View, TextInput } from "react-native";
import { Input } from "@rneui/themed";
import React, { FC } from "react";

export interface InputFormProps {
  title?: string;
  password?: boolean;
}

export const InputForm: FC<InputFormProps> = ({ title, password }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.formText}>{title}</Text>
      <Input secureTextEntry={password ?? false} style={styles.textInput}  inputContainerStyle={{ borderBottomWidth: 0 }}/>
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
    paddingHorizontal: 15
  },
  formText: {
    fontSize: 16,
    alignItems: "center",
    marginLeft: 10
  },
});

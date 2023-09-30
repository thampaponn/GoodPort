import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React,{FC} from "react";


export interface ButtonUiProps{
    title:string
    callback?: () => void
}

export const ButtonUi:FC<ButtonUiProps> = ({title, callback}) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={callback}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 42,
    justifyContent: "center",
    fontSize: 12,
    backgroundColor: "#81ADC8",
    width: 307,
    height: 42,
    borderRadius: 10,
    marginBottom : 20
  },
  buttonText: {
    fontSize: 20,
    color: "#F8F2DC",
    lineHeight: 30,
    textAlign: "center",
  },
});

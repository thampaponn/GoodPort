import React,{FC} from "react";
import { View, Text, StyleSheet } from "react-native";

export interface HeaderProps{
  title:string
}

const Header: FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    paddingTop: 44,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#81ADC8",
    fontSize: 32,
    fontWeight: "700",
  },
});

export default Header;
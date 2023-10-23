import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { Button, Card, Icon, Input, Dialog } from "@rneui/themed";



const AddProductAdvisor = () => {
  return (
    <View>
      <SafeAreaView>
        <Card
          containerStyle={{ borderRadius: 20, padding: 25, marginBottom: 50 }}
        >
          <Text
            style={{ marginLeft: 10, fontSize: 16, alignItems: "center" }}
          >
            ชื่อประกาศ *
          </Text>
          <TextInput
            style={styles.textInput}
          />
          <Text
            style={{ textAlign: "right", marginTop: 20, marginRight: 10 }}
          >
            รูปขนาดไม่เกิน 10 MB
          </Text>
          <Button
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
              />}
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

import { Card, Chip } from "@rneui/themed";
import { View, Text } from "react-native";

const ProductCategory = () => {
  return (
    <View style={{backgroundColor: "white", height:"100%"}}>
      <Card containerStyle={{borderRadius:8,padding:0, paddingVertical:10}}>
        <Card containerStyle={{paddingHorizontal:10 , padding:0, marginVertical:0}}>
            <View style={{display:"flex", flexDirection:"row" ,alignItems:"center"}}>
                <Card.Image style={{
                marginTop: 15,
                marginBottom: 10,
                height: 50,
                width: 50,
                borderRadius: 100,
              }} source={require("../assets/placeholder.png")} />
              <View style={{marginLeft:10}}>
                <Text>TanaThip Singhanon</Text>
                <Chip containerStyle={{marginTop:5}} title={"Student"} color="success" size="sm" />
              </View>
            </View>
        </Card>
      </Card>
    </View>
  );
};

export default ProductCategory;

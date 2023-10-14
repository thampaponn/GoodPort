import { Card, CheckBox } from "@rneui/themed";
import { useState } from "react";
import { Text, View } from "react-native";

type filterType = {
  name: string;
};

type ProductFilterProps = {
  type: filterType[];
};

export const ProudctFilter = ({ type }: ProductFilterProps) => {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <Card containerStyle={{ borderRadius: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}>
        ประเภทโครงงาน
      </Text>
      <View style={{ marginTop: 5 }}>
        {type.map((type, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              size={20}
              containerStyle={{ padding: 0 }}
              checkedColor="black"
            />
            <Text>{type.name}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

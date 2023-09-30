import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../screens/MainPageScreen";

const Tab = createBottomTabNavigator();

export default BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions= {{ 
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={MainPage} />
    </Tab.Navigator>
  )
}


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../screens/MainPageScreen";
import AddPortScreen from "../screens/AddPortScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions= {{ 
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Add" component={AddPortScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
export default BottomTabNavigation;

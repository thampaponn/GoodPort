import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPortScreen from "../screens/AddPortScreen";
import MainPageScreen from "../screens/MainPageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProductDetail from "../screens/ProductDetail";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="productmain"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="productmain" component={MainPageScreen} />
      <Stack.Screen name="detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions= {{ 
      headerShown: false
    }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Add" component={AddPortScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
export default BottomTabNavigation;

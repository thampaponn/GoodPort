import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPortScreen from "../screens/AddPortScreen";
import MainPageScreen from "../screens/MainPageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProductDetail from "../screens/ProductDetail";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon } from '@rneui/themed';

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
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarActiveTintColor: "#0098DA",
      headerShown: false,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name="Home" component={HomeStack} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home-filled" size={30} color={color} />
        },
      }} />
      <Tab.Screen name="Add" component={AddPortScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="add-circle-outline" size={30} color={color} />
        },
      }} />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="notifications-none" size={30} color={color} />
        },
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="person" size={30} color={color} />
        },
      }} />
    </Tab.Navigator>
  )
}
export default BottomTabNavigation;

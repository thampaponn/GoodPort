import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPortScreen from "../screens/AddPortScreen";
import MainPageScreen from "../screens/MainPageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProductDetail from "../screens/ProductDetail";
import ProfileScreen from "../screens/ProfileScreen";
import { SearchMenu } from "../screens/SearchMenu";
import { Ionicons } from "@expo/vector-icons";

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

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchMenu} />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Add" component={AddPortScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen
    options={{
      tabBarLabel: "Profile",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-circle" size={size} color={color} />
      ),
    }}
    name="profilestack"
    component={ProfileStack}
  />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;

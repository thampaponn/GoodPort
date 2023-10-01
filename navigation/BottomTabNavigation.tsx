import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "../screens/MainPageScreen";
import AddPortScreen from "../screens/AddPortScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      tabBarActiveTintColor: "#0098DA",
      headerShown: false,
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name="Home" component={MainPage} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={30} color={color} />
        },
      }} />
      <Tab.Screen name="Add" component={AddPortScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="add-circle-outline" size={30} color={color} />
        }
      }} />
      <Tab.Screen name="Notification" component={NotificationScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="notifications" size={30} color={color} />
        }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Icon name="person" size={30} color={color} />
        }
      }} />
    </Tab.Navigator>
  )
}
export default BottomTabNavigation;

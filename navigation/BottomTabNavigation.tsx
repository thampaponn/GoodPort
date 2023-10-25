import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPortScreen from "../screens/AddPortScreen";
import MainPageScreen from "../screens/MainPageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProductDetail from "../screens/ProductDetail";
import ProfileScreen from "../screens/ProfileScreen";
import { SearchMenu } from "../screens/SearchMenu";
import { Ionicons } from "@expo/vector-icons";
import CommentScreen from "../screens/CommentScreen";
import ProductCategory from "../screens/ProductCategory";
import ProfilePublic from "../screens/ProfilePublic";
import EditAdvisorPost from "../screens/edit/EditAdvisorPost";
import SignIn from "../screens/auth/SignIn";
import ProductAdvisorCategory from "../screens/ProductAdvisorCategory";
import EditProfile from "../screens/edit/EditProfile";
import ProductAdvisorDetail from "../screens/ProductAdvisorDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={MainPageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="detail" component={ProductDetail} options={{ headerShown: true, headerTitle: "รายละเอียดของโปรเจกต์" }} />
      <Stack.Screen name="comment" component={CommentScreen} />
      <Stack.Screen name="postAdvisorEdit" component={EditAdvisorPost} options={{ headerShown: true, headerTitle: "แก้ไขรายละเอียดประกาศ" }}  />
      <Stack.Screen name="advisorDetail" component={ProductAdvisorDetail} options={{ headerShown: true, headerTitle: "รายละเอียดของประกาศ" }} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="editProfile" component={EditProfile} options={{ headerShown: true, headerTitle: "แก้ไขโปรไฟล์" }} />
      <Stack.Screen name="Search" component={SearchMenu} />
      <Stack.Screen name="profilePublic" component={ProfilePublic} options={{ headerShown: true, headerTitle: "รายละเอียด" }} />
      <Stack.Screen name="editPostAdivsor" component={EditAdvisorPost} />
      <Stack.Screen name="category" component={ProductCategory} options={{ headerShown: true, headerTitle: "หมวดหมู่โปรเจกต์" }} />
      <Stack.Screen name="categoryAdvisor" component={ProductAdvisorCategory} />
      <Stack.Screen name="logout" component={SignIn} />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: "#34448A",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} name="homemain" component={HomeStack} />
      <Tab.Screen
        options={{
          tabBarLabel: "Upload",
          tabBarActiveTintColor: "#34448A",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }} name="Add" component={AddPortScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: "Notifications",
          tabBarActiveTintColor: "#34448A",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }} name="Notification" component={NotificationScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: "#34448A",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }} name="profilestack" component={ProfileStack}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;

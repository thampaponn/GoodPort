import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { LoadingState } from "../components/ui/States";
import { IconName } from "../constants/labels";
import { useAuth } from "../context/AuthContext";
import { colors, fonts } from "../theme";
import { SignInScreen } from "../screens/auth/SignInScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";
import { AdvisorPostDetailScreen } from "../screens/advisor/AdvisorPostDetailScreen";
import { AdvisorPostsScreen } from "../screens/advisor/AdvisorPostsScreen";
import { EditAdvisorPostScreen } from "../screens/advisor/EditAdvisorPostScreen";
import { CreateScreen } from "../screens/create/CreateScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { NotificationsScreen } from "../screens/notifications/NotificationsScreen";
import { PostDetailScreen } from "../screens/post/PostDetailScreen";
import { UserCategoryPostsScreen } from "../screens/post/UserCategoryPostsScreen";
import { EditProfileScreen } from "../screens/profile/EditProfileScreen";
import { MyProfileScreen } from "../screens/profile/MyProfileScreen";
import { PublicProfileScreen } from "../screens/profile/PublicProfileScreen";
import { SearchUsersScreen } from "../screens/profile/SearchUsersScreen";
import { MainTabParamList, ProfileStackParamList, RootStackParamList } from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background, primary: colors.primary },
};

const headerOptions: NativeStackNavigationOptions = {
  headerTintColor: colors.primary,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: colors.background },
  headerTitleStyle: { fontFamily: fonts.semibold, fontSize: 17, color: colors.text },
  headerBackTitleVisible: false,
};

const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={headerOptions}>
    <ProfileStack.Screen name="profile" component={MyProfileScreen} options={{ headerShown: false }} />
    <ProfileStack.Screen name="editProfile" component={EditProfileScreen} options={{ title: "แก้ไขโปรไฟล์" }} />
    <ProfileStack.Screen name="search" component={SearchUsersScreen} options={{ title: "ค้นหาผู้ใช้" }} />
    <ProfileStack.Screen name="publicProfile" component={PublicProfileScreen} options={{ title: "โปรไฟล์" }} />
    <ProfileStack.Screen name="category" component={UserCategoryPostsScreen} options={{ title: "หมวดหมู่โปรเจกต์" }} />
    <ProfileStack.Screen name="advisorPosts" component={AdvisorPostsScreen} options={{ title: "โพสต์อาจารย์" }} />
    <ProfileStack.Screen name="editAdvisorPost" component={EditAdvisorPostScreen} options={{ title: "แก้ไขประกาศ" }} />
  </ProfileStack.Navigator>
);

const tabIcon =
  (focused: IconName, idle: IconName) =>
  ({ color, size, focused: isFocused }: { color: string; size: number; focused: boolean }) =>
    <Ionicons name={isFocused ? focused : idle} size={size} color={color} />;

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
      tabBarStyle: { borderTopColor: colors.border },
    }}
  >
    <Tab.Screen
      name="homeTab"
      component={HomeScreen}
      options={{ tabBarLabel: "หน้าหลัก", tabBarIcon: tabIcon("home", "home-outline") }}
    />
    <Tab.Screen
      name="createTab"
      component={CreateScreen}
      options={{ tabBarLabel: "อัพโหลด", tabBarIcon: tabIcon("add-circle", "add-circle-outline") }}
    />
    <Tab.Screen
      name="notificationsTab"
      component={NotificationsScreen}
      options={{
        tabBarLabel: "แจ้งเตือน",
        tabBarIcon: tabIcon("notifications", "notifications-outline"),
      }}
    />
    <Tab.Screen
      name="profileTab"
      component={ProfileNavigator}
      options={{ tabBarLabel: "โปรไฟล์", tabBarIcon: tabIcon("person-circle", "person-circle-outline") }}
    />
  </Tab.Navigator>
);

export const RootNavigator = () => {
  const { user, restoring } = useAuth();

  if (restoring) {
    return <LoadingState />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStack.Navigator screenOptions={headerOptions}>
        {user ? (
          <>
            <RootStack.Screen name="main" component={MainTabs} options={{ headerShown: false }} />
            <RootStack.Screen name="detail" component={PostDetailScreen} options={{ title: "รายละเอียดโปรเจกต์" }} />
            <RootStack.Screen name="advisorDetail" component={AdvisorPostDetailScreen} options={{ title: "รายละเอียดประกาศ" }} />
          </>
        ) : (
          <>
            <RootStack.Screen name="signin" component={SignInScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="signup" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

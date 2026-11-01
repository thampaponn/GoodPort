import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdvisorPost, PostCategory, User } from "../types/models";

export type ProfileStackParamList = {
  profile: undefined;
  editProfile: undefined;
  search: undefined;
  publicProfile: { user: User };
  category: { user: User; category: PostCategory };
  advisorPosts: { user: User };
  editAdvisorPost: { post: AdvisorPost };
};

export type MainTabParamList = {
  homeTab: undefined;
  createTab: undefined;
  notificationsTab: undefined;
  profileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type RootStackParamList = {
  signin: { registered?: boolean } | undefined;
  signup: undefined;
  main: NavigatorScreenParams<MainTabParamList> | undefined;
  detail: { postId: string };
  advisorDetail: { postId: string };
};

export const useRootNavigation = () =>
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export const useProfileNavigation = () =>
  useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

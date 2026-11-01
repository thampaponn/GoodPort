import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { PostCategory, UserRole, UserSex } from "../types/models";

export type IconName = ComponentProps<typeof Ionicons>["name"];

type CategoryMeta = {
  value: PostCategory;
  label: string;
  icon: IconName;
  color: string;
  soft: string;
};

export const CATEGORIES: CategoryMeta[] = [
  { value: PostCategory.Learning, label: "การเรียน", icon: "book-outline", color: "#34448A", soft: "#E9ECF7" },
  { value: PostCategory.Activity, label: "กีฬา", icon: "medal-outline", color: "#B7791F", soft: "#FDF1DC" },
  { value: PostCategory.Internship, label: "สหกิจ", icon: "school-outline", color: "#7A3FA0", soft: "#F2E8F8" },
  { value: PostCategory.Volunteer, label: "จิตอาสา", icon: "people-outline", color: "#1F8A5B", soft: "#DFF4E9" },
  { value: PostCategory.Other, label: "อื่นๆ", icon: "ellipsis-horizontal", color: "#5B6480", soft: "#ECEEF4" },
];

export const categoryMeta = (category: PostCategory): CategoryMeta =>
  CATEGORIES.find((item) => item.value === category) ?? CATEGORIES[CATEGORIES.length - 1];

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.Advisor]: "อาจารย์",
  [UserRole.Student]: "นักศึกษา",
  [UserRole.Visitor]: "ผู้เยี่ยมชม",
};

export const SEX_OPTIONS = [
  { value: UserSex.Male, label: "ชาย" },
  { value: UserSex.Female, label: "หญิง" },
  { value: UserSex.Other, label: "อื่นๆ" },
];

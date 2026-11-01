import { Platform, ViewStyle } from "react-native";

export const colors = {
  primary: "#34448A",
  primaryDark: "#26336B",
  primarySoft: "#E9ECF7",
  accent: "#FFD257",
  accentSoft: "#FFF4D1",
  background: "#F5F6FB",
  surface: "#FFFFFF",
  text: "#1B2140",
  textMuted: "#667091",
  textInverse: "#FFFFFF",
  border: "#E2E5F0",
  success: "#1F8A5B",
  successSoft: "#DFF4E9",
  danger: "#D0433B",
  dangerSoft: "#FBE9E7",
  warning: "#B7791F",
  warningSoft: "#FDF1DC",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const fonts = {
  regular: "BaiJamjuree-Regular",
  medium: "BaiJamjuree-Medium",
  semibold: "BaiJamjuree-SemiBold",
  bold: "BaiJamjuree-Bold",
} as const;

export const fontAssets = {
  [fonts.regular]: require("../assets/fonts/BaiJamjuree-Regular.ttf"),
  [fonts.medium]: require("../assets/fonts/BaiJamjuree-Medium.ttf"),
  [fonts.semibold]: require("../assets/fonts/BaiJamjuree-SemiBold.ttf"),
  [fonts.bold]: require("../assets/fonts/BaiJamjuree-Bold.ttf"),
};

export const shadow: ViewStyle = Platform.select({
  web: { boxShadow: "0 6px 18px rgba(38, 51, 107, 0.07)" } as ViewStyle,
  default: {
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
  },
});

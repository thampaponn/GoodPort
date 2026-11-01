import { StyleSheet, Text, TextProps } from "react-native";
import { colors, fonts } from "../../theme";

type Variant = "title" | "heading" | "subheading" | "body" | "bodyMedium" | "label" | "caption";

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
};

export const AppText = ({ variant = "body", color = colors.text, style, ...rest }: AppTextProps) => (
  <Text style={[styles[variant], { color }, style]} {...rest} />
);

// Thai vowels and tone marks stack high, so line heights run taller than Latin defaults.
const styles = StyleSheet.create({
  title: { fontFamily: fonts.bold, fontSize: 26, lineHeight: 36 },
  heading: { fontFamily: fonts.semibold, fontSize: 20, lineHeight: 29 },
  subheading: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 23 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18 },
});

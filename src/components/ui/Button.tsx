import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { IconName } from "../../constants/labels";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

type Variant = "primary" | "secondary" | "soft" | "danger";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const palette: Record<Variant, { background: string; foreground: string; border: string }> = {
  primary: { background: colors.primary, foreground: colors.textInverse, border: colors.primary },
  secondary: { background: colors.surface, foreground: colors.primary, border: colors.border },
  soft: { background: colors.primarySoft, foreground: colors.primary, border: colors.primarySoft },
  danger: { background: colors.dangerSoft, foreground: colors.danger, border: colors.dangerSoft },
};

export const Button = ({
  title,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
}: ButtonProps) => {
  const { background, foreground, border } = palette[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: background, borderColor: border },
        pressed && styles.pressed,
        inactive && styles.inactive,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={19} color={foreground} />}
          <AppText variant="subheading" color={foreground}>
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  pressed: { opacity: 0.85 },
  inactive: { opacity: 0.6 },
});

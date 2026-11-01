import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { IconName } from "../../constants/labels";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

type ListRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  iconColor?: string;
  iconBackground?: string;
  onPress?: () => void;
};

export const ListRow = ({
  icon,
  title,
  subtitle,
  iconColor = colors.primary,
  iconBackground = colors.primarySoft,
  onPress,
}: ListRowProps) => (
  <Pressable
    disabled={!onPress}
    accessibilityRole={onPress ? "button" : undefined}
    onPress={onPress}
    style={styles.row}
  >
    <View style={[styles.icon, { backgroundColor: iconBackground }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.text}>
      {subtitle && (
        <AppText variant="caption" color={colors.textMuted}>
          {subtitle}
        </AppText>
      )}
      <AppText variant="bodyMedium">{title}</AppText>
    </View>
    {onPress && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />}
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
  },
  text: { flex: 1 },
});

import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { IconName } from "../../constants/labels";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

type ChipProps = {
  label: string;
  icon?: IconName;
  selected?: boolean;
  onPress?: () => void;
};

export const Chip = ({ label, icon, selected = false, onPress }: ChipProps) => {
  const foreground = selected ? colors.textInverse : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      {icon && <Ionicons name={icon} size={15} color={foreground} />}
      <AppText variant="label" color={foreground}>
        {label}
      </AppText>
    </Pressable>
  );
};

type BadgeProps = {
  label: string;
  icon?: IconName;
  color?: string;
  background?: string;
};

export const Badge = ({
  label,
  icon,
  color = colors.primary,
  background = colors.primarySoft,
}: BadgeProps) => (
  <View style={[styles.badge, { backgroundColor: background }]}>
    {icon && <Ionicons name={icon} size={13} color={color} />}
    <AppText variant="caption" color={color} style={styles.badgeLabel}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.xs,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  badgeLabel: { fontWeight: "600" },
});

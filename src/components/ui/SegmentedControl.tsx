import { Pressable, StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

type Option<T> = { value: T; label: string };

type SegmentedControlProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) => (
  <View style={styles.track}>
    {options.map((option) => {
      const selected = option.value === value;
      return (
        <Pressable
          key={option.value}
          accessibilityRole="tab"
          accessibilityState={{ selected }}
          onPress={() => onChange(option.value)}
          style={[styles.segment, selected && styles.selected]}
        >
          <AppText variant="label" color={selected ? colors.textInverse : colors.textMuted}>
            {option.label}
          </AppText>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    padding: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 9,
    borderRadius: radius.sm,
  },
  selected: { backgroundColor: colors.primary },
});

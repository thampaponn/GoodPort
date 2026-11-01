import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

export type SelectOption = { value: string; label: string; description?: string };

type SelectSheetProps = {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
};

export const SelectSheet = ({ label, placeholder, options, value, onChange }: SelectSheetProps) => {
  const [open, setOpen] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const selected = options.find((option) => option.value === value);

  return (
    <View style={styles.field}>
      <AppText variant="label">{label}</AppText>
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)} style={styles.trigger}>
        <AppText color={selected ? colors.text : colors.textMuted} numberOfLines={1} style={styles.value}>
          {selected?.label ?? placeholder}
        </AppText>
        <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
      </Pressable>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: bottom + spacing.lg }]}>
            <View style={styles.grabber} />
            <AppText variant="heading" style={styles.sheetTitle}>
              {label}
            </AppText>
            <FlatList
              data={options}
              keyExtractor={(option) => option.value}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="button"
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <View style={styles.optionText}>
                    <AppText variant="bodyMedium">{item.label}</AppText>
                    {item.description && (
                      <AppText variant="caption" color={colors.textMuted}>
                        {item.description}
                      </AppText>
                    )}
                  </View>
                  {item.value === value && (
                    <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                  )}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  field: { gap: 6 },
  trigger: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  value: { flex: 1 },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(27, 33, 64, 0.45)",
  },
  sheet: {
    maxHeight: "70%",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  grabber: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  sheetTitle: { marginVertical: spacing.md },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  optionText: { flex: 1 },
});

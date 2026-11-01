import { Ionicons } from "@expo/vector-icons";
import { Ref, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { IconName } from "../../constants/labels";
import { colors, fonts, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

export type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  icon?: IconName;
  inputRef?: Ref<TextInput>;
};

export const TextField = ({
  label,
  error,
  icon,
  inputRef,
  multiline,
  secureTextEntry,
  onBlur,
  ...inputProps
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <View style={styles.field}>
      {label && <AppText variant="label">{label}</AppText>}
      <View
        style={[
          styles.box,
          multiline && styles.boxMultiline,
          focused && styles.boxFocused,
          !!error && styles.boxError,
        ]}
      >
        {icon && <Ionicons name={icon} size={19} color={colors.textMuted} />}
        <TextInput
          ref={inputRef}
          style={[styles.input, multiline && styles.inputMultiline]}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          secureTextEntry={secureTextEntry && !revealed}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...inputProps}
        />
        {secureTextEntry && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            hitSlop={8}
            onPress={() => setRevealed(!revealed)}
          >
            <Ionicons
              name={revealed ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <AppText variant="caption" color={colors.danger}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  field: { gap: 6 },
  box: {
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
  boxMultiline: { alignItems: "flex-start", paddingVertical: spacing.sm },
  boxFocused: { borderColor: colors.primary },
  boxError: { borderColor: colors.danger },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    paddingVertical: spacing.sm,
    // The box above already shows focus, so drop the browser's own ring.
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as TextStyle) : null),
  },
  inputMultiline: { minHeight: 92, textAlignVertical: "top" },
});

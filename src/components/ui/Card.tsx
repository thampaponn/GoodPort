import { PropsWithChildren } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors, radius, shadow, spacing } from "../../theme";
import { AppText } from "./AppText";

type CardProps = PropsWithChildren<{
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export const Card = ({ children, onPress, style }: CardProps) =>
  onPress ? (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  ) : (
    <View style={[styles.card, style]}>{children}</View>
  );

type FormSectionProps = PropsWithChildren<{ title: string; hint?: string }>;

export const FormSection = ({ title, hint, children }: FormSectionProps) => (
  <Card style={styles.section}>
    <View>
      <AppText variant="subheading">{title}</AppText>
      {hint && (
        <AppText variant="caption" color={colors.textMuted}>
          {hint}
        </AppText>
      )}
    </View>
    {children}
  </Card>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadow,
  },
  pressed: { opacity: 0.9 },
  section: { padding: spacing.lg, gap: spacing.md },
});

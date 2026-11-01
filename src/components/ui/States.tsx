import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { IconName } from "../../constants/labels";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

export const LoadingState = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

type LoadingOverlayProps = { visible: boolean; message?: string };

export const LoadingOverlay = ({ visible, message }: LoadingOverlayProps) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.backdrop}>
      <View style={styles.dialog}>
        <ActivityIndicator size="large" color={colors.primary} />
        {message && <AppText variant="label">{message}</AppText>}
      </View>
    </View>
  </Modal>
);

type EmptyStateProps = {
  icon?: IconName;
  title: string;
  subtitle?: string;
};

export const EmptyState = ({ icon = "file-tray-outline", title, subtitle }: EmptyStateProps) => (
  <View style={styles.empty}>
    <View style={styles.emptyIcon}>
      <Ionicons name={icon} size={26} color={colors.primary} />
    </View>
    <AppText variant="subheading">{title}</AppText>
    {subtitle && (
      <AppText variant="label" color={colors.textMuted} style={styles.emptySubtitle}>
        {subtitle}
      </AppText>
    )}
  </View>
);

type FormErrorProps = { message: string | null };

export const FormError = ({ message }: FormErrorProps) =>
  message ? (
    <View style={styles.formError}>
      <Ionicons name="alert-circle" size={18} color={colors.danger} />
      <AppText variant="label" color={colors.danger} style={styles.formErrorText}>
        {message}
      </AppText>
    </View>
  ) : null;

type FormNoticeProps = { message: string };

export const FormNotice = ({ message }: FormNoticeProps) => (
  <View style={[styles.formError, styles.formNotice]}>
    <Ionicons name="checkmark-circle" size={18} color={colors.success} />
    <AppText variant="label" color={colors.success} style={styles.formErrorText}>
      {message}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(27, 33, 64, 0.45)",
  },
  dialog: {
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.xl,
    minWidth: 150,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  empty: { alignItems: "center", gap: spacing.xs, padding: spacing.xl },
  emptyIcon: {
    width: 56,
    height: 56,
    marginBottom: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
  },
  emptySubtitle: { textAlign: "center" },
  formError: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dangerSoft,
  },
  formErrorText: { flex: 1 },
  formNotice: { backgroundColor: colors.successSoft },
});

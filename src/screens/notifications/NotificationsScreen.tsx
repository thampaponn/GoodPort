import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { acceptAlert, fetchConfirmedAlerts, fetchPendingAlerts } from "../../api/alerts";
import { acceptPost } from "../../api/posts";
import { AppText } from "../../components/ui/AppText";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Chip";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { ListRow } from "../../components/ui/ListRow";
import { categoryMeta } from "../../constants/labels";
import { useCurrentUser } from "../../context/AuthContext";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { useRootNavigation } from "../../navigation/types";
import { Alert } from "../../types/models";
import { colors, spacing } from "../../theme";
import { fullName } from "../../utils/format";

type PendingCardProps = {
  alert: Alert;
  onOpen: () => void;
  onConfirmed: () => void;
};

const PendingCard = ({ alert, onOpen, onConfirmed }: PendingCardProps) => {
  const [confirming, setConfirming] = useState(false);
  const meta = categoryMeta(alert.postCategory);

  const confirm = async () => {
    setConfirming(true);
    try {
      await acceptAlert(alert.advisorId ?? "", alert.postId);
      await acceptPost(alert.postId);
      Toast.show({ type: "success", text1: "ยืนยันโปรเจกต์แล้ว" });
      onConfirmed();
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "ยืนยันไม่สำเร็จ กรุณาลองใหม่" });
      setConfirming(false);
    }
  };

  return (
    <Card style={styles.pending}>
      <Badge label={meta.label} icon={meta.icon} color={meta.color} background={meta.soft} />
      <AppText variant="subheading">{alert.postTitle}</AppText>
      <AppText variant="label" color={colors.textMuted}>
        เจ้าของโครงงาน: {fullName(alert.owner)}
      </AppText>
      <View style={styles.actions}>
        <Button title="ดูรายละเอียด" variant="secondary" onPress={onOpen} style={styles.action} />
        <Button title="ยืนยัน" icon="checkmark" loading={confirming} onPress={confirm} style={styles.action} />
      </View>
    </Card>
  );
};

export const NotificationsScreen = () => {
  const navigation = useRootNavigation();
  const me = useCurrentUser();
  const { data, loading, reload } = useFocusFetch(async () => {
    const [pending, confirmed] = await Promise.all([
      fetchPendingAlerts(me._id),
      fetchConfirmedAlerts(me._id),
    ]);
    return { pending, confirmed };
  });

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {loading && !data ? (
        <LoadingState />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <AppText variant="title">การแจ้งเตือน</AppText>

          <View style={styles.section}>
            <AppText variant="subheading">
              ต้องการยืนยัน{data?.pending.length ? ` (${data.pending.length})` : ""}
            </AppText>
            {data?.pending.length ? (
              data.pending.map((alert) => (
                <PendingCard
                  key={alert._id}
                  alert={alert}
                  onOpen={() => navigation.navigate("detail", { postId: alert.postId })}
                  onConfirmed={reload}
                />
              ))
            ) : (
              <Card>
                <EmptyState icon="checkmark-done-outline" title="ไม่มีโปรเจกต์ให้ยืนยัน" />
              </Card>
            )}
          </View>

          <View style={styles.section}>
            <AppText variant="subheading">แจ้งเตือน</AppText>
            {data?.confirmed.length ? (
              <Card style={styles.list}>
                {data.confirmed.map((alert) => (
                  <ListRow
                    key={alert._id}
                    icon="checkmark-circle"
                    iconColor={colors.success}
                    iconBackground={colors.successSoft}
                    subtitle="ถูกยืนยันแล้ว"
                    title={alert.postTitle}
                    onPress={() => navigation.navigate("detail", { postId: alert.postId })}
                  />
                ))}
              </Card>
            ) : (
              <Card>
                <EmptyState icon="notifications-off-outline" title="ไม่มีแจ้งเตือน" />
              </Card>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.xl },
  section: { gap: spacing.md },
  pending: { padding: spacing.lg, gap: spacing.sm },
  actions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  action: { flex: 1 },
  list: { paddingVertical: spacing.sm },
});

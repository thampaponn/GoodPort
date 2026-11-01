import { ReactNode, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CATEGORIES, IconName, ROLE_LABELS } from "../constants/labels";
import { useProfileNavigation } from "../navigation/types";
import { User, UserRole } from "../types/models";
import { colors, radius, spacing } from "../theme";
import { fullName } from "../utils/format";
import { AppText } from "./ui/AppText";
import { Avatar } from "./ui/Avatar";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Chip";
import { ListRow } from "./ui/ListRow";
import { SegmentedControl } from "./ui/SegmentedControl";
import { EmptyState } from "./ui/States";

type Tab = "content" | "info";

const TABS: { value: Tab; label: string }[] = [
  { value: "content", label: "เนื้อหา" },
  { value: "info", label: "ข้อมูลส่วนตัว" },
];

const infoRows = (user: User): { icon: IconName; label: string; value?: string }[] => [
  { icon: "person-outline", label: "ชื่อบัญชีผู้ใช้", value: user.username },
  { icon: "mail-outline", label: "อีเมล", value: user.email },
  { icon: "phone-portrait-outline", label: "เบอร์โทรศัพท์", value: user.phone },
  { icon: "card-outline", label: "รหัสประจำตัวนักศึกษา", value: user.job?.studentId },
  { icon: "card-outline", label: "รหัสประจำตัวอาจารย์", value: user.job?.professorId },
  { icon: "school-outline", label: "มหาวิทยาลัยที่จบการศึกษา", value: user.information?.university },
  { icon: "earth-outline", label: "ประเทศที่จบการศึกษา", value: user.information?.graduatedFrom },
  { icon: "briefcase-outline", label: "อาชีพ", value: user.job?.title },
  { icon: "location-outline", label: "สถานที่ทำงาน / สถานที่ศึกษา", value: user.information?.location },
  { icon: "call-outline", label: "หมายเลขติดต่อที่ทำงาน", value: user.information?.companyNumber },
];

type ProfileViewProps = {
  user: User;
  headerAction?: ReactNode;
  footer?: ReactNode;
};

export const ProfileView = ({ user, headerAction, footer }: ProfileViewProps) => {
  const navigation = useProfileNavigation();
  const [tab, setTab] = useState<Tab>("content");
  const name = fullName(user);
  const details = infoRows(user).filter((row) => !!row.value);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.banner}>
        <View style={styles.bannerAction}>{headerAction}</View>
      </View>
      <View style={styles.identity}>
        <View style={styles.avatarRing}>
          <Avatar name={name} uri={user.image?.profileImage} size={104} />
        </View>
        <AppText variant="heading" style={styles.name}>
          {name}
        </AppText>
        <View>
          <Badge label={ROLE_LABELS[user.role]} color={colors.warning} background={colors.accentSoft} />
        </View>
      </View>

      <View style={styles.body}>
        <SegmentedControl options={TABS} value={tab} onChange={setTab} />

        {tab === "content" ? (
          <Card style={styles.list}>
            {user.role === UserRole.Advisor ? (
              <ListRow
                icon="megaphone-outline"
                title="โพสต์อาจารย์"
                onPress={() => navigation.navigate("advisorPosts", { user })}
              />
            ) : (
              CATEGORIES.map((category) => (
                <ListRow
                  key={category.value}
                  icon={category.icon}
                  iconColor={category.color}
                  iconBackground={category.soft}
                  title={`หมวด${category.label}`}
                  onPress={() =>
                    navigation.navigate("category", { user, category: category.value })
                  }
                />
              ))
            )}
          </Card>
        ) : (
          <Card style={styles.list}>
            {details.length > 0 ? (
              details.map((row) => (
                <ListRow key={row.label} icon={row.icon} subtitle={row.label} title={row.value ?? ""} />
              ))
            ) : (
              <EmptyState title="ไม่มีข้อมูล" />
            )}
          </Card>
        )}

        {footer}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xl },
  banner: {
    height: 120,
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  bannerAction: { marginTop: "auto", padding: spacing.md, paddingBottom: 46 },
  identity: { alignItems: "center", marginTop: -56, gap: spacing.xs },
  avatarRing: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: colors.background,
  },
  name: { textAlign: "center", paddingHorizontal: spacing.lg },
  body: { padding: spacing.lg, gap: spacing.lg },
  list: { paddingVertical: spacing.sm },
});

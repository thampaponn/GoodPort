import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { fetchPost } from "../../api/posts";
import { fetchUser } from "../../api/users";
import { PostCover, isVerified } from "../../components/PostCard";
import { AppText } from "../../components/ui/AppText";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Chip";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { categoryMeta } from "../../constants/labels";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { RootStackParamList } from "../../navigation/types";
import { PostStatus } from "../../types/models";
import { colors, radius, spacing } from "../../theme";
import { formatDate, fullName } from "../../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "detail">;

const loadPost = async (postId: string) => {
  const post = await fetchPost(postId);
  const advisor = post.advisor?.userId ? await fetchUser(post.advisor.userId) : null;
  return { post, advisor };
};

type SectionProps = { title: string; text?: string };

const Section = ({ title, text }: SectionProps) => (
  <View style={styles.section}>
    <AppText variant="subheading">{title}</AppText>
    <AppText color={text ? colors.text : colors.textMuted}>{text || "ไม่มี"}</AppText>
  </View>
);

export const PostDetailScreen = ({ route }: Props) => {
  const { postId } = route.params;
  const { data, loading } = useFocusFetch(() => loadPost(postId));

  if (!data) {
    return loading ? <LoadingState /> : <EmptyState icon="alert-circle-outline" title="ไม่พบโปรเจกต์" />;
  }

  const { post, advisor } = data;
  const meta = categoryMeta(post.category);
  const ownerName = fullName(post.owner);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card style={styles.hero}>
        <PostCover image={post.image} category={post.category} height={210} />
        <View style={styles.heroBody}>
          <View style={styles.badges}>
            <Badge label={meta.label} icon={meta.icon} color={meta.color} background={meta.soft} />
            {isVerified(post) && (
              <Badge
                label="อาจารย์รับรอง"
                icon="checkmark-circle"
                color={colors.success}
                background={colors.successSoft}
              />
            )}
            {post.status === PostStatus.Submitted && (
              <Badge
                label="รออาจารย์ยืนยัน"
                icon="time-outline"
                color={colors.warning}
                background={colors.warningSoft}
              />
            )}
          </View>
          <AppText variant="heading">{post.nameTh}</AppText>
          <AppText variant="label" color={colors.textMuted}>
            {post.nameEn}
          </AppText>
          <View style={styles.person}>
            <Avatar name={ownerName} size={36} />
            <View style={styles.personText}>
              <AppText variant="label">{ownerName}</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                โพสต์เมื่อ {formatDate(post.createAt)}
              </AppText>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.sections}>
        <Section title="วัตถุประสงค์" text={post.objective} />
        <Section title="ที่มาของโครงงาน" text={post.source} />
        <Section title="รายละเอียดโครงงาน" text={post.detail} />
      </Card>

      {!!post.file && (
        <Pressable
          accessibilityRole="link"
          onPress={() => post.file && Linking.openURL(post.file)}
          style={styles.file}
        >
          <Ionicons name="document-text" size={26} color={colors.primary} />
          <View style={styles.personText}>
            <AppText variant="bodyMedium">ไฟล์ที่เกี่ยวข้อง</AppText>
            <AppText variant="caption" color={colors.textMuted}>
              แตะเพื่อเปิดไฟล์ PDF
            </AppText>
          </View>
          <Ionicons name="open-outline" size={18} color={colors.primary} />
        </Pressable>
      )}

      {!!post.advisor?.userId && (
        <Card style={styles.advisor}>
          <AppText variant="subheading">อาจารย์ที่ปรึกษา</AppText>
          <View style={styles.person}>
            <Avatar name={fullName(post.advisor)} uri={advisor?.image?.profileImage} />
            <View style={styles.personText}>
              <AppText variant="bodyMedium">{fullName(post.advisor)}</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                {post.advisor.email}
              </AppText>
            </View>
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  hero: { overflow: "hidden" },
  heroBody: { padding: spacing.lg, gap: 2 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: spacing.sm },
  person: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.sm },
  personText: { flex: 1 },
  sections: { padding: spacing.lg, gap: spacing.lg },
  section: { gap: spacing.xs },
  file: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
  },
  advisor: { padding: spacing.lg },
});

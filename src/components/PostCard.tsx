import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import { categoryMeta } from "../constants/labels";
import { Post, PostCategory, PostStatus } from "../types/models";
import { colors, radius, spacing } from "../theme";
import { fullName } from "../utils/format";
import { AppText } from "./ui/AppText";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Chip";

type PostCoverProps = { image?: string; category: PostCategory; height: number };

export const PostCover = ({ image, category, height }: PostCoverProps) => {
  const meta = categoryMeta(category);

  if (image) {
    return <Image source={{ uri: image }} style={[styles.cover, { height }]} />;
  }
  return (
    <View style={[styles.cover, styles.coverEmpty, { height, backgroundColor: meta.soft }]}>
      <Ionicons name={meta.icon} size={height * 0.3} color={meta.color} />
    </View>
  );
};

export const isVerified = (post: Post) =>
  !!post.advisor?.userId && post.status === PostStatus.Accepted;

type PostCardProps = { post: Post; onPress: () => void };

export const PostCard = ({ post, onPress }: PostCardProps) => {
  const meta = categoryMeta(post.category);

  return (
    <Card onPress={onPress} style={styles.card}>
      <PostCover image={post.image} category={post.category} height={170} />
      <View style={styles.body}>
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
        </View>
        <AppText variant="subheading" numberOfLines={2}>
          {post.nameTh}
        </AppText>
        <AppText variant="caption" color={colors.textMuted} numberOfLines={1}>
          {post.nameEn}
        </AppText>
        <View style={styles.people}>
          <Ionicons name="person-outline" size={14} color={colors.textMuted} />
          <AppText variant="label" color={colors.textMuted} numberOfLines={1} style={styles.person}>
            {fullName(post.owner)}
          </AppText>
        </View>
        {!!post.advisor?.userId && (
          <View style={styles.people}>
            <Ionicons name="school-outline" size={14} color={colors.textMuted} />
            <AppText variant="label" color={colors.textMuted} numberOfLines={1} style={styles.person}>
              {fullName(post.advisor)}
            </AppText>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { overflow: "hidden" },
  cover: { width: "100%", backgroundColor: colors.primarySoft },
  coverEmpty: { alignItems: "center", justifyContent: "center" },
  body: { padding: spacing.lg, gap: 2, borderRadius: radius.lg },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: spacing.sm },
  people: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.xs },
  person: { flex: 1 },
});

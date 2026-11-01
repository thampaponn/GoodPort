import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { AdvisorPost } from "../types/models";
import { colors, radius, spacing } from "../theme";
import { formatDate, fullName } from "../utils/format";
import { AppText } from "./ui/AppText";
import { Avatar } from "./ui/Avatar";
import { Card } from "./ui/Card";

type AdvisorPostCardProps = {
  post: AdvisorPost;
  onPress?: () => void;
  onEdit?: () => void;
};

export const AdvisorPostCard = ({ post, onPress, onEdit }: AdvisorPostCardProps) => {
  const name = fullName(post.owner);
  const commentCount = post.comments?.length ?? 0;

  return (
    <Card>
      <Pressable
        disabled={!onPress}
        accessibilityRole={onPress ? "button" : undefined}
        onPress={onPress}
        style={styles.body}
      >
        <View style={[styles.header, !!onEdit && styles.headerWithAction]}>
          <Avatar name={name} uri={post.owner.image} />
          <View style={styles.author}>
            <AppText variant="bodyMedium" numberOfLines={1}>
              {name}
            </AppText>
            <AppText variant="caption" color={colors.textMuted}>
              อาจารย์ · {formatDate(post.createAt)}
            </AppText>
          </View>
        </View>

        <AppText numberOfLines={onPress ? 4 : undefined}>{post.detail}</AppText>
        {!!post.image && <Image source={{ uri: post.image }} style={styles.image} />}

        <View style={styles.footer}>
          <Ionicons name="chatbubble-outline" size={15} color={colors.textMuted} />
          <AppText variant="caption" color={colors.textMuted}>
            {commentCount} ความคิดเห็น
          </AppText>
        </View>
      </Pressable>

      {onEdit && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="แก้ไขประกาศ"
          hitSlop={8}
          onPress={onEdit}
          style={styles.edit}
        >
          <Ionicons name="create-outline" size={20} color={colors.primary} />
        </Pressable>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  headerWithAction: { paddingRight: 44 },
  author: { flex: 1 },
  edit: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  footer: { flexDirection: "row", alignItems: "center", gap: 6 },
});

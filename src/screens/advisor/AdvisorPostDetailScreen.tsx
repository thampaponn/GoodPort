import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { addAdvisorPostComment, fetchAdvisorPost } from "../../api/advisorPosts";
import { AdvisorPostCard } from "../../components/AdvisorPostCard";
import { AppText } from "../../components/ui/AppText";
import { Avatar } from "../../components/ui/Avatar";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { useCurrentUser } from "../../context/AuthContext";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { RootStackParamList } from "../../navigation/types";
import { colors, fonts, radius, spacing } from "../../theme";
import { fullName } from "../../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "advisorDetail">;

export const AdvisorPostDetailScreen = ({ route }: Props) => {
  const { postId } = route.params;
  const me = useCurrentUser();
  const { bottom } = useSafeAreaInsets();
  const { data: post, loading, reload } = useFocusFetch(() => fetchAdvisorPost(postId));
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  const send = async () => {
    const detail = comment.trim();
    if (!detail) {
      return;
    }
    setSending(true);
    try {
      await addAdvisorPostComment(postId, {
        userId: me._id,
        image: me.image?.profileImage ?? "",
        fname: me.fname,
        lname: me.lname,
        detail,
      });
      setComment("");
      await reload();
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "ส่งความคิดเห็นไม่สำเร็จ" });
    } finally {
      setSending(false);
    }
  };

  if (!post) {
    return loading ? <LoadingState /> : <EmptyState icon="alert-circle-outline" title="ไม่พบประกาศ" />;
  }

  const comments = post.comments ?? [];

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <AdvisorPostCard post={post} />
        <AppText variant="subheading">ความคิดเห็น</AppText>
        {comments.length === 0 && (
          <EmptyState icon="chatbubbles-outline" title="ยังไม่มีความคิดเห็น" subtitle="เริ่มต้นบทสนทนาเลย" />
        )}
        {comments.map((item, index) => (
          <View key={item._id ?? index} style={styles.comment}>
            <Avatar name={fullName(item)} uri={item.image} size={36} />
            <View style={styles.bubble}>
              <AppText variant="label">{fullName(item)}</AppText>
              <AppText>{item.detail}</AppText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: bottom + spacing.sm }]}>
        <TextInput
          style={styles.input}
          placeholder="แสดงความคิดเห็น..."
          placeholderTextColor={colors.textMuted}
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={send}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="ส่งความคิดเห็น"
          disabled={sending || !comment.trim()}
          onPress={send}
          style={[styles.send, (sending || !comment.trim()) && styles.sendDisabled]}
        >
          <Ionicons name="send" size={18} color={colors.textInverse} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  comment: { flexDirection: "row", gap: spacing.sm },
  bubble: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderTopLeftRadius: spacing.xs,
    backgroundColor: colors.surface,
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as TextStyle) : null),
  },
  send: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: colors.primary,
  },
  sendDisabled: { opacity: 0.5 },
});

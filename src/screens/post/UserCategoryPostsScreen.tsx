import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { fetchUserPostsByCategory } from "../../api/posts";
import { PostCard } from "../../components/PostCard";
import { AppText } from "../../components/ui/AppText";
import { Badge } from "../../components/ui/Chip";
import { Avatar } from "../../components/ui/Avatar";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { ROLE_LABELS, categoryMeta } from "../../constants/labels";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { ProfileStackParamList, useRootNavigation } from "../../navigation/types";
import { colors, spacing } from "../../theme";
import { fullName } from "../../utils/format";

type Props = NativeStackScreenProps<ProfileStackParamList, "category">;

export const UserCategoryPostsScreen = ({ route }: Props) => {
  const { user, category } = route.params;
  const navigation = useRootNavigation();
  const meta = categoryMeta(category);
  const { data, loading } = useFocusFetch(() => fetchUserPostsByCategory(category, user._id));

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={data ?? []}
      keyExtractor={(post) => post._id}
      renderItem={({ item }) => (
        <PostCard post={item} onPress={() => navigation.navigate("detail", { postId: item._id })} />
      )}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        <View style={styles.header}>
          <Avatar name={fullName(user)} uri={user.image?.profileImage} size={52} />
          <View style={styles.identity}>
            <AppText variant="subheading">{fullName(user)}</AppText>
            <AppText variant="caption" color={colors.textMuted}>
              {ROLE_LABELS[user.role]}
            </AppText>
          </View>
          <Badge label={meta.label} icon={meta.icon} color={meta.color} background={meta.soft} />
        </View>
      }
      ListEmptyComponent={loading ? <LoadingState /> : <EmptyState title="ไม่พบเนื้อหา" />}
    />
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg },
  identity: { flex: 1 },
  separator: { height: spacing.lg },
});

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { fetchAdvisorPostsByUser } from "../../api/advisorPosts";
import { AdvisorPostCard } from "../../components/AdvisorPostCard";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { useCurrentUser } from "../../context/AuthContext";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { ProfileStackParamList, useRootNavigation } from "../../navigation/types";
import { colors, spacing } from "../../theme";

type Props = NativeStackScreenProps<ProfileStackParamList, "advisorPosts">;

export const AdvisorPostsScreen = ({ navigation, route }: Props) => {
  const { user } = route.params;
  const me = useCurrentUser();
  const rootNavigation = useRootNavigation();
  const { data, loading } = useFocusFetch(() => fetchAdvisorPostsByUser(user._id));

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={data ?? []}
      keyExtractor={(post) => post._id}
      renderItem={({ item }) => (
        <AdvisorPostCard
          post={item}
          onPress={() => rootNavigation.navigate("advisorDetail", { postId: item._id })}
          onEdit={
            item.owner.userId === me._id
              ? () => navigation.navigate("editAdvisorPost", { post: item })
              : undefined
          }
        />
      )}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={loading ? <LoadingState /> : <EmptyState title="ไม่พบเนื้อหา" />}
    />
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  separator: { height: spacing.lg },
});

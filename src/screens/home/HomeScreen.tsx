import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAdvisorPosts } from "../../api/advisorPosts";
import { fetchRecentPosts } from "../../api/posts";
import { AdvisorPostCard } from "../../components/AdvisorPostCard";
import { PostCard } from "../../components/PostCard";
import { AppText } from "../../components/ui/AppText";
import { Chip } from "../../components/ui/Chip";
import { SegmentedControl } from "../../components/ui/SegmentedControl";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { TextField } from "../../components/ui/TextField";
import { CATEGORIES } from "../../constants/labels";
import { useCurrentUser } from "../../context/AuthContext";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { useRootNavigation } from "../../navigation/types";
import { AdvisorPost, Post, PostCategory, UserRole } from "../../types/models";
import { colors, radius, spacing } from "../../theme";

type Feed = "posts" | "advisor";

const FEEDS: { value: Feed; label: string }[] = [
  { value: "posts", label: "ผลงาน" },
  { value: "advisor", label: "ประกาศอาจารย์" },
];

const loadFeeds = async () => {
  const [posts, advisorPosts] = await Promise.all([fetchRecentPosts(), fetchAdvisorPosts()]);
  return { posts, advisorPosts };
};

export const HomeScreen = () => {
  const navigation = useRootNavigation();
  const me = useCurrentUser();
  const { data, loading, failed, reload } = useFocusFetch(loadFeeds);
  const [feed, setFeed] = useState<Feed>("posts");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState<PostCategory[]>([]);

  const toggleCategory = (category: PostCategory) =>
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );

  const posts = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return (data?.posts ?? []).filter(
      (post) =>
        (categories.length === 0 || categories.includes(post.category)) &&
        `${post.nameTh} ${post.nameEn}`.toLowerCase().includes(term)
    );
  }, [data, keyword, categories]);

  const showingPosts = feed === "posts";
  const items: (Post | AdvisorPost)[] = showingPosts ? posts : data?.advisorPosts ?? [];

  const renderItem = ({ item }: { item: Post | AdvisorPost }) =>
    showingPosts ? (
      <PostCard
        post={item as Post}
        onPress={() => navigation.navigate("detail", { postId: item._id })}
      />
    ) : (
      <AdvisorPostCard
        post={item as AdvisorPost}
        onPress={() => navigation.navigate("advisorDetail", { postId: item._id })}
      />
    );

  const header = (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <Image
          source={require("../../../assets/brand-logo.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="GoodPort"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="รีเฟรช"
          hitSlop={8}
          onPress={reload}
          style={styles.refresh}
        >
          <Ionicons name="refresh" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View>
        <AppText variant="title">สวัสดี, {me.fname}</AppText>
        <AppText color={colors.textMuted}>ผลงานใหม่ใน 7 วันที่ผ่านมา</AppText>
      </View>

      {me.role !== UserRole.Visitor && (
        <SegmentedControl options={FEEDS} value={feed} onChange={setFeed} />
      )}

      {showingPosts && (
        <>
          <TextField
            icon="search"
            placeholder="ค้นหาชื่อโครงงาน"
            value={keyword}
            onChangeText={setKeyword}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {CATEGORIES.map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                icon={category.icon}
                selected={categories.includes(category.value)}
                onPress={() => toggleCategory(category.value)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={header}
        ListEmptyComponent={
          loading ? (
            <LoadingState />
          ) : (
            <EmptyState
              icon={failed ? "cloud-offline-outline" : "search-outline"}
              title={failed ? "โหลดข้อมูลไม่สำเร็จ" : "ไม่พบเนื้อหา"}
              subtitle={failed ? "ตรวจสอบการเชื่อมต่อ แล้วกดรีเฟรชอีกครั้ง" : undefined}
            />
          )
        }
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        refreshing={loading && !!data}
        onRefresh={reload}
      />
    </SafeAreaView>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  header: { gap: spacing.lg, marginBottom: spacing.lg },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  logo: { width: 130, height: 38 },
  refresh: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  categories: { gap: spacing.sm },
  separator: { height: spacing.lg },
});

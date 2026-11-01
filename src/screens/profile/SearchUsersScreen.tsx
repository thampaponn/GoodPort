import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { fetchUsers } from "../../api/users";
import { AppText } from "../../components/ui/AppText";
import { Avatar } from "../../components/ui/Avatar";
import { Card } from "../../components/ui/Card";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { TextField } from "../../components/ui/TextField";
import { ROLE_LABELS } from "../../constants/labels";
import { useCurrentUser } from "../../context/AuthContext";
import { useFocusFetch } from "../../hooks/useFocusFetch";
import { ProfileStackParamList } from "../../navigation/types";
import { colors, spacing } from "../../theme";
import { fullName } from "../../utils/format";

type Props = NativeStackScreenProps<ProfileStackParamList, "search">;

export const SearchUsersScreen = ({ navigation }: Props) => {
  const me = useCurrentUser();
  const { data, loading } = useFocusFetch(fetchUsers);
  const [keyword, setKeyword] = useState("");

  const users = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    return (data ?? []).filter(
      (user) => user._id !== me._id && fullName(user).toLowerCase().includes(term)
    );
  }, [data, keyword, me._id]);

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={users}
      keyExtractor={(user) => user._id}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Card
          style={styles.card}
          onPress={() => navigation.navigate("publicProfile", { user: item })}
        >
          <Avatar name={fullName(item)} uri={item.image?.profileImage} />
          <View style={styles.identity}>
            <AppText variant="bodyMedium" numberOfLines={1}>
              {fullName(item)}
            </AppText>
            <AppText variant="caption" color={colors.textMuted} numberOfLines={1}>
              {ROLE_LABELS[item.role]}
              {item.email ? ` · ${item.email}` : ""}
            </AppText>
          </View>
        </Card>
      )}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        <View style={styles.search}>
          <TextField
            icon="search"
            placeholder="ค้นหาจากชื่อหรือนามสกุล"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
      }
      ListEmptyComponent={
        loading ? <LoadingState /> : <EmptyState icon="people-outline" title="ไม่พบผู้ใช้งาน" />
      }
    />
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  search: { marginBottom: spacing.lg },
  card: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md },
  identity: { flex: 1 },
  separator: { height: spacing.md },
});

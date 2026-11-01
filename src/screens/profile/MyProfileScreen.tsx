import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ProfileView } from "../../components/ProfileView";
import { Button } from "../../components/ui/Button";
import { useAuth, useCurrentUser } from "../../context/AuthContext";
import { ProfileStackParamList } from "../../navigation/types";
import { colors, radius, spacing } from "../../theme";

type Props = NativeStackScreenProps<ProfileStackParamList, "profile">;

export const MyProfileScreen = ({ navigation }: Props) => {
  const { signOut, refreshUser } = useAuth();
  const user = useCurrentUser();

  useFocusEffect(
    useCallback(() => {
      refreshUser().catch(console.error);
    }, [refreshUser])
  );

  return (
    <ProfileView
      user={user}
      headerAction={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="ค้นหาผู้ใช้"
          hitSlop={8}
          onPress={() => navigation.navigate("search")}
          style={styles.search}
        >
          <Ionicons name="search" size={20} color={colors.textInverse} />
        </Pressable>
      }
      footer={
        <View style={styles.actions}>
          <Button
            title="แก้ไขโปรไฟล์"
            variant="secondary"
            icon="create-outline"
            onPress={() => navigation.navigate("editProfile")}
          />
          <Button title="ออกจากระบบ" variant="danger" icon="log-out-outline" onPress={signOut} />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  search: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  actions: { gap: spacing.md },
});

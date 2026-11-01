import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/ui/AppText";
import { useCurrentUser } from "../../context/AuthContext";
import { UserRole } from "../../types/models";
import { colors, spacing } from "../../theme";
import { AdvisorPostForm } from "./AdvisorPostForm";
import { PostForm } from "./PostForm";

export const CreateScreen = () => {
  const me = useCurrentUser();
  const isAdvisor = me.role === UserRole.Advisor;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View>
          <AppText variant="title">{isAdvisor ? "สร้างประกาศ" : "เพิ่มผลงาน"}</AppText>
          <AppText color={colors.textMuted}>
            {isAdvisor ? "แจ้งข่าวหรือรับสมัครนักศึกษา" : "แชร์โครงงานของคุณลงในพอร์ต"}
          </AppText>
        </View>
        {isAdvisor ? <AdvisorPostForm /> : <PostForm />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
});

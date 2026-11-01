import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { ProfileStackParamList } from "../../navigation/types";
import { colors, spacing } from "../../theme";
import { AdvisorPostForm } from "../create/AdvisorPostForm";

type Props = NativeStackScreenProps<ProfileStackParamList, "editAdvisorPost">;

export const EditAdvisorPostScreen = ({ route }: Props) => (
  <ScrollView
    style={styles.screen}
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="handled"
  >
    <AdvisorPostForm post={route.params.post} />
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
});

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getErrorMessage } from "../../api/client";
import { AppText } from "../../components/ui/AppText";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FormError, FormNotice } from "../../components/ui/States";
import { TextField } from "../../components/ui/TextField";
import { useAuth } from "../../context/AuthContext";
import { RootStackParamList } from "../../navigation/types";
import { colors, spacing } from "../../theme";

type Props = NativeStackScreenProps<RootStackParamList, "signin">;

export const SignInScreen = ({ navigation, route }: Props) => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await signIn(username, password);
    } catch (err) {
      setError(getErrorMessage(err, "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"));
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image
            source={require("../../../assets/brand-logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="GoodPort"
          />
          <AppText color={colors.textMuted} style={styles.tagline}>
            พื้นที่รวมผลงานของนักศึกษา ให้คนที่ตามหาคุณเจอ
          </AppText>

          <Card style={styles.card}>
            <AppText variant="heading">เข้าสู่ระบบ</AppText>
            {route.params?.registered && !error && (
              <FormNotice message="สมัครสมาชิกสำเร็จ เข้าสู่ระบบได้เลย" />
            )}
            <FormError message={error} />
            <TextField
              label="ชื่อบัญชีผู้ใช้"
              icon="person-outline"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
            <TextField
              label="รหัสผ่าน"
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleSubmit}
            />
            <Button title="เข้าสู่ระบบ" loading={submitting} onPress={handleSubmit} />
          </Card>

          <View style={styles.footer}>
            <AppText variant="label" color={colors.textMuted}>
              ยังไม่มีบัญชีผู้ใช้?
            </AppText>
            <Pressable accessibilityRole="link" onPress={() => navigation.navigate("signup")}>
              <AppText variant="label" color={colors.primary}>
                สมัครบัญชีผู้ใช้
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { flexGrow: 1, justifyContent: "center", padding: spacing.xl, gap: spacing.lg },
  logo: { alignSelf: "center", width: 240, height: 68 },
  tagline: { textAlign: "center", marginBottom: spacing.sm },
  card: { padding: spacing.xl, gap: spacing.lg },
  footer: { flexDirection: "row", justifyContent: "center", gap: 6 },
});

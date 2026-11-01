import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Control, Controller, useForm, useWatch } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getErrorMessage } from "../../api/client";
import { createUser } from "../../api/users";
import { AppText } from "../../components/ui/AppText";
import { ImageField } from "../../components/ui/AttachmentFields";
import { Button } from "../../components/ui/Button";
import { FormSection } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { FormField } from "../../components/ui/FormField";
import { FormError, LoadingOverlay } from "../../components/ui/States";
import { IconName, SEX_OPTIONS } from "../../constants/labels";
import { useRootNavigation } from "../../navigation/types";
import { SignUpValues, signUpSchema } from "../../schemas";
import { uploadFile } from "../../services/media";
import { UserRole, UserSex } from "../../types/models";
import { colors, radius, spacing } from "../../theme";

const ROLE_CARDS: { value: UserRole; label: string; hint: string; icon: IconName }[] = [
  { value: UserRole.Student, label: "นักศึกษา", hint: "KMITL", icon: "school-outline" },
  { value: UserRole.Advisor, label: "อาจารย์", hint: "KMITL", icon: "ribbon-outline" },
  { value: UserRole.Visitor, label: "ผู้เยี่ยมชม", hint: "บุคคลทั่วไป", icon: "eye-outline" },
];

type RoleFieldsProps = { control: Control<SignUpValues> };

const AdvisorFields = ({ control }: RoleFieldsProps) => (
  <>
    <FormField control={control} name="preflex" label="คำนำหน้า" />
    <FormField control={control} name="job.professorId" label="รหัสประจำตัวอาจารย์" />
    <FormField control={control} name="information.university" label="มหาวิทยาลัยที่จบการศึกษา" />
    <FormField control={control} name="information.graduatedFrom" label="ประเทศที่จบการศึกษา" />
  </>
);

const VisitorFields = ({ control }: RoleFieldsProps) => (
  <>
    <FormField control={control} name="preflex" label="คำนำหน้า" />
    <FormField control={control} name="job.title" label="อาชีพ" />
    <FormField control={control} name="information.location" label="สถานที่ทำงาน / สถานที่ศึกษา" />
    <FormField
      control={control}
      name="information.companyNumber"
      label="เบอร์ติดต่อสถานที่ทำงาน"
      keyboardType="phone-pad"
    />
  </>
);

export const SignUpScreen = () => {
  const navigation = useRootNavigation();
  const [studentCard, setStudentCard] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    shouldUnregister: true,
    defaultValues: { role: UserRole.Student, sex: UserSex.Male },
  });
  const role = useWatch({ control, name: "role" });

  const onSubmit = async (values: SignUpValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const card = role === UserRole.Student && studentCard ? await uploadFile(studentCard) : "";
      await createUser({ ...values, image: { studentCard: card } });
      navigation.navigate("signin", { registered: true });
    } catch (err) {
      setError(getErrorMessage(err, "สมัครไม่สำเร็จ ชื่อผู้ใช้นี้อาจถูกใช้งานแล้ว"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <LoadingOverlay visible={submitting} message="กำลังสมัครสมาชิก" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="กลับ"
            hitSlop={8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={26} color={colors.primary} />
          </Pressable>
          <Image
            source={require("../../../assets/brand-logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="GoodPort"
          />
        </View>
        <View>
          <AppText variant="title">สมัครสมาชิก</AppText>
          <AppText color={colors.textMuted}>เลือกประเภทบัญชี แล้วกรอกข้อมูลของคุณ</AppText>
        </View>

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <View style={styles.roles}>
              {ROLE_CARDS.map((card) => {
                const selected = field.value === card.value;
                return (
                  <Pressable
                    key={card.value}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => field.onChange(card.value)}
                    style={[styles.role, selected && styles.roleSelected]}
                  >
                    <Ionicons
                      name={card.icon}
                      size={24}
                      color={selected ? colors.textInverse : colors.primary}
                    />
                    <AppText variant="label" color={selected ? colors.textInverse : colors.text}>
                      {card.label}
                    </AppText>
                    <AppText
                      variant="caption"
                      color={selected ? colors.primarySoft : colors.textMuted}
                    >
                      {card.hint}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          )}
        />

        <FormSection title="ข้อมูลส่วนตัว">
          <FormField control={control} name="fname" label="ชื่อ" />
          <FormField control={control} name="lname" label="นามสกุล" />
          <Controller
            control={control}
            name="sex"
            render={({ field }) => (
              <View style={styles.sexField}>
                <AppText variant="label">เพศ</AppText>
                <View style={styles.sexOptions}>
                  {SEX_OPTIONS.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      selected={field.value === option.value}
                      onPress={() => field.onChange(option.value)}
                    />
                  ))}
                </View>
              </View>
            )}
          />
          <FormField control={control} name="phone" label="เบอร์โทรศัพท์" keyboardType="phone-pad" />
          <FormField
            control={control}
            name="email"
            label="อีเมล"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </FormSection>

        <FormSection title="บัญชีผู้ใช้">
          <FormField control={control} name="username" label="ชื่อผู้ใช้" autoCapitalize="none" />
          <FormField control={control} name="password" label="รหัสผ่าน" secureTextEntry />
        </FormSection>

        {role === UserRole.Student && (
          <FormSection title="ข้อมูลนักศึกษา">
            <FormField control={control} name="job.studentId" label="รหัสประจำตัวนักศึกษา" />
            <ImageField uri={studentCard} onChange={setStudentCard} title="อัพโหลดบัตรนักศึกษา" />
          </FormSection>
        )}
        {role === UserRole.Advisor && (
          <FormSection title="ข้อมูลอาจารย์">
            <AdvisorFields control={control} />
          </FormSection>
        )}
        {role === UserRole.Visitor && (
          <FormSection title="ข้อมูลผู้เยี่ยมชม">
            <VisitorFields control={control} />
          </FormSection>
        )}

        <FormError message={error} />
        <Button title="สมัครสมาชิก" onPress={handleSubmit(onSubmit)} />

        <View style={styles.footer}>
          <AppText variant="label" color={colors.textMuted}>
            สมัครสมาชิกแล้ว?
          </AppText>
          <Pressable accessibilityRole="link" onPress={() => navigation.navigate("signin")}>
            <AppText variant="label" color={colors.primary}>
              เข้าสู่ระบบ
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  logo: { width: 130, height: 38 },
  roles: { flexDirection: "row", gap: spacing.sm },
  role: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  roleSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  sexField: { gap: 6 },
  sexOptions: { flexDirection: "row", gap: spacing.sm },
  footer: { flexDirection: "row", justifyContent: "center", gap: 6 },
});

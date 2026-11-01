import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { getErrorMessage } from "../../api/client";
import { updateUser } from "../../api/users";
import { ImageField } from "../../components/ui/AttachmentFields";
import { Button } from "../../components/ui/Button";
import { FormSection } from "../../components/ui/Card";
import { FormField } from "../../components/ui/FormField";
import { FormError, LoadingOverlay } from "../../components/ui/States";
import { useAuth, useCurrentUser } from "../../context/AuthContext";
import { ProfileStackParamList } from "../../navigation/types";
import { ProfileValues, profileSchema } from "../../schemas";
import { resolveImageUrl } from "../../services/media";
import { colors, spacing } from "../../theme";

type Props = NativeStackScreenProps<ProfileStackParamList, "editProfile">;

export const EditProfileScreen = ({ navigation }: Props) => {
  const user = useCurrentUser();
  const { refreshUser } = useAuth();
  const [image, setImage] = useState<string | null>(user.image?.profileImage || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      email: user.email ?? "",
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const profileImage = await resolveImageUrl(image);
      await updateUser(user._id, { ...values, image: { ...user.image, profileImage } });
      await refreshUser();
      Toast.show({ type: "success", text1: "บันทึกโปรไฟล์แล้ว" });
      navigation.goBack();
    } catch (err) {
      setError(getErrorMessage(err, "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"));
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <LoadingOverlay visible={submitting} message="กำลังบันทึก" />
      <FormSection title="ข้อมูลส่วนตัว">
        <FormField control={control} name="fname" label="ชื่อ" />
        <FormField control={control} name="lname" label="นามสกุล" />
        <FormField control={control} name="phone" label="หมายเลขโทรศัพท์" keyboardType="phone-pad" />
        <FormField
          control={control}
          name="email"
          label="อีเมล"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </FormSection>
      <FormSection title="รูปโปรไฟล์">
        <ImageField uri={image} onChange={setImage} title="อัพโหลดรูปโปรไฟล์" />
      </FormSection>
      <FormError message={error} />
      <Button title="บันทึก" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
});

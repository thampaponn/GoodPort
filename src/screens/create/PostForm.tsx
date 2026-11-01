import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { createAlert } from "../../api/alerts";
import { getErrorMessage } from "../../api/client";
import { createPost } from "../../api/posts";
import { fetchAdvisorCandidates } from "../../api/users";
import { AppText } from "../../components/ui/AppText";
import { ImageField, PdfField } from "../../components/ui/AttachmentFields";
import { Button } from "../../components/ui/Button";
import { FormSection } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { FormField } from "../../components/ui/FormField";
import { SelectSheet } from "../../components/ui/SelectSheet";
import { FormError, LoadingOverlay } from "../../components/ui/States";
import { CATEGORIES, ROLE_LABELS } from "../../constants/labels";
import { useCurrentUser } from "../../context/AuthContext";
import { PostValues, postSchema } from "../../schemas";
import { PickedFile, uploadFile } from "../../services/media";
import { PostCategory, PostStatus, User } from "../../types/models";
import { spacing } from "../../theme";
import { fullName } from "../../utils/format";

const NO_ADVISOR = "none";

const emptyPost: PostValues = {
  nameTh: "",
  nameEn: "",
  category: PostCategory.Learning,
  objective: "",
  source: "",
  detail: "",
};

export const PostForm = () => {
  const navigation = useNavigation<{ navigate: (route: "homeTab") => void }>();
  const me = useCurrentUser();
  const [candidates, setCandidates] = useState<User[]>([]);
  const [advisorId, setAdvisorId] = useState(NO_ADVISOR);
  const [image, setImage] = useState<string | null>(null);
  const [pdf, setPdf] = useState<PickedFile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: emptyPost,
  });

  useEffect(() => {
    fetchAdvisorCandidates().then(setCandidates).catch(console.error);
  }, []);

  const advisorOptions = useMemo(
    () => [
      { value: NO_ADVISOR, label: "ไม่มี" },
      ...candidates
        .filter((user) => user._id !== me._id)
        .map((user) => ({
          value: user._id,
          label: fullName(user),
          description: ROLE_LABELS[user.role],
        })),
    ],
    [candidates, me._id]
  );

  const onSubmit = async (values: PostValues) => {
    const advisor = candidates.find((user) => user._id === advisorId);
    setSubmitting(true);
    setError(null);
    try {
      const [imageUrl, fileUrl] = await Promise.all([
        image ? uploadFile(image) : "",
        pdf ? uploadFile(pdf.uri, pdf.name) : "",
      ]);
      const post = await createPost({
        ...values,
        image: imageUrl,
        file: fileUrl,
        status: advisor ? PostStatus.Submitted : PostStatus.Accepted,
        owner: { userId: me._id, fname: me.fname, lname: me.lname, email: me.email ?? "" },
        advisor: advisor
          ? { userId: advisor._id, fname: advisor.fname, lname: advisor.lname, email: advisor.email }
          : {},
      });
      await createAlert({
        owner: { userId: me._id, fname: me.fname, lname: me.lname },
        postId: post._id,
        postTitle: post.nameTh,
        postCategory: post.category,
        advisorId: advisor?._id,
        advisorFname: advisor?.fname,
        advisorLname: advisor?.lname,
        detail: post.status,
      });
      reset(emptyPost);
      setImage(null);
      setPdf(null);
      setAdvisorId(NO_ADVISOR);
      Toast.show({
        type: "success",
        text1: advisor ? "ส่งให้อาจารย์ยืนยันแล้ว" : "โพสต์สำเร็จ",
      });
      navigation.navigate("homeTab");
    } catch (err) {
      setError(getErrorMessage(err, "โพสต์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <LoadingOverlay visible={submitting} message="กำลังโพสต์ผลงาน" />

      <FormSection title="ข้อมูลโครงงาน">
        <FormField control={control} name="nameTh" label="ชื่อโครงงานภาษาไทย *" />
        <FormField control={control} name="nameEn" label="ชื่อโครงงานภาษาอังกฤษ *" />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <View style={styles.field}>
              <AppText variant="label">ประเภทโครงงาน *</AppText>
              <View style={styles.categories}>
                {CATEGORIES.map((category) => (
                  <Chip
                    key={category.value}
                    label={category.label}
                    icon={category.icon}
                    selected={field.value === category.value}
                    onPress={() => field.onChange(category.value)}
                  />
                ))}
              </View>
            </View>
          )}
        />
      </FormSection>

      <FormSection title="รายละเอียด">
        <FormField control={control} name="objective" label="จุดประสงค์" multiline />
        <FormField control={control} name="source" label="ที่มา" multiline />
        <FormField control={control} name="detail" label="รายละเอียด" multiline />
      </FormSection>

      <FormSection title="รูปภาพและไฟล์แนบ">
        <ImageField uri={image} onChange={setImage} />
        <PdfField file={pdf} onChange={setPdf} />
      </FormSection>

      <FormSection title="อาจารย์ที่ปรึกษา" hint="หากเลือก ผลงานจะแสดงในหน้าหลักหลังอาจารย์ยืนยัน">
        <SelectSheet
          label="ผู้รับรองผลงาน"
          placeholder="เลือกอาจารย์ที่ปรึกษา"
          options={advisorOptions}
          value={advisorId}
          onChange={setAdvisorId}
        />
      </FormSection>

      <FormError message={error} />
      <Button title="โพสต์ผลงาน" icon="paper-plane-outline" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  field: { gap: 6 },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});

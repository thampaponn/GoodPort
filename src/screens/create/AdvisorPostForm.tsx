import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { createAdvisorPost, updateAdvisorPost } from "../../api/advisorPosts";
import { getErrorMessage } from "../../api/client";
import { ImageField } from "../../components/ui/AttachmentFields";
import { Button } from "../../components/ui/Button";
import { FormSection } from "../../components/ui/Card";
import { FormField } from "../../components/ui/FormField";
import { FormError, LoadingOverlay } from "../../components/ui/States";
import { useCurrentUser } from "../../context/AuthContext";
import { AdvisorPostValues, advisorPostSchema } from "../../schemas";
import { resolveImageUrl } from "../../services/media";
import { AdvisorPost } from "../../types/models";
import { spacing } from "../../theme";

type AdvisorPostFormProps = {
  // When set the form edits this post; otherwise it creates a new one.
  post?: AdvisorPost;
};

export const AdvisorPostForm = ({ post }: AdvisorPostFormProps) => {
  const navigation = useNavigation<{ navigate: (route: "homeTab") => void; goBack: () => void }>();
  const me = useCurrentUser();
  const [image, setImage] = useState<string | null>(post?.image || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<AdvisorPostValues>({
    resolver: zodResolver(advisorPostSchema),
    defaultValues: { detail: post?.detail ?? "" },
  });

  const onSubmit = async ({ detail }: AdvisorPostValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const imageUrl = await resolveImageUrl(image);
      if (post) {
        await updateAdvisorPost(post._id, { detail, image: imageUrl });
        Toast.show({ type: "success", text1: "บันทึกการแก้ไขแล้ว" });
        navigation.goBack();
      } else {
        await createAdvisorPost({
          detail,
          image: imageUrl,
          owner: {
            userId: me._id,
            fname: me.fname,
            lname: me.lname,
            email: me.email,
            image: me.image?.profileImage ?? "",
          },
        });
        reset({ detail: "" });
        setImage(null);
        Toast.show({ type: "success", text1: "โพสต์ประกาศสำเร็จ" });
        navigation.navigate("homeTab");
      }
    } catch (err) {
      setError(getErrorMessage(err, "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <LoadingOverlay visible={submitting} message="กำลังบันทึก" />
      <FormSection title="ประกาศ">
        <FormField control={control} name="detail" label="ข้อความประกาศ *" multiline />
        <ImageField uri={image} onChange={setImage} />
      </FormSection>
      <FormError message={error} />
      <Button
        title={post ? "บันทึกการแก้ไข" : "โพสต์ประกาศ"}
        icon="paper-plane-outline"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
});

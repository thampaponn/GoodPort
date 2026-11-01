import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { IconName } from "../../constants/labels";
import { PickedFile, pickImage, pickPdf } from "../../services/media";
import { colors, radius, spacing } from "../../theme";
import { AppText } from "./AppText";

type DropZoneProps = { icon: IconName; title: string; hint: string; onPress: () => void };

const DropZone = ({ icon, title, hint, onPress }: DropZoneProps) => (
  <Pressable accessibilityRole="button" onPress={onPress} style={styles.dropZone}>
    <Ionicons name={icon} size={26} color={colors.primary} />
    <AppText variant="label" color={colors.primary}>
      {title}
    </AppText>
    <AppText variant="caption" color={colors.textMuted}>
      {hint}
    </AppText>
  </Pressable>
);

type RemoveButtonProps = { label: string; onPress: () => void };

const RemoveButton = ({ label, onPress }: RemoveButtonProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    hitSlop={8}
    onPress={onPress}
    style={styles.remove}
  >
    <Ionicons name="close" size={16} color={colors.textInverse} />
  </Pressable>
);

type ImageFieldProps = {
  uri: string | null;
  onChange: (uri: string | null) => void;
  title?: string;
};

export const ImageField = ({ uri, onChange, title = "อัพโหลดรูปภาพ" }: ImageFieldProps) => {
  const choose = async () => {
    const picked = await pickImage();
    if (picked) {
      onChange(picked);
    }
  };

  if (!uri) {
    return <DropZone icon="image-outline" title={title} hint="รูปขนาดไม่เกิน 10 MB" onPress={choose} />;
  }

  return (
    <View>
      <Image source={{ uri }} style={styles.preview} />
      <View style={styles.previewAction}>
        <RemoveButton label="ลบรูปภาพ" onPress={() => onChange(null)} />
      </View>
    </View>
  );
};

type PdfFieldProps = {
  file: PickedFile | null;
  onChange: (file: PickedFile | null) => void;
};

export const PdfField = ({ file, onChange }: PdfFieldProps) => {
  const choose = async () => {
    const picked = await pickPdf();
    if (picked) {
      onChange(picked);
    }
  };

  if (!file) {
    return (
      <DropZone icon="document-attach-outline" title="แนบไฟล์ PDF" hint="ไม่บังคับ" onPress={choose} />
    );
  }

  return (
    <View style={styles.fileRow}>
      <Ionicons name="document-text" size={24} color={colors.primary} />
      <AppText variant="label" numberOfLines={1} style={styles.fileName}>
        {file.name}
      </AppText>
      <RemoveButton label="ลบไฟล์" onPress={() => onChange(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.primary + "55",
    backgroundColor: colors.primarySoft + "66",
  },
  preview: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  previewAction: { position: "absolute", top: spacing.sm, right: spacing.sm },
  remove: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(27, 33, 64, 0.7)",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  fileName: { flex: 1 },
});

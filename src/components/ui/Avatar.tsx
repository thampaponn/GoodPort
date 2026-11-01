import { Image, StyleSheet, View } from "react-native";
import { colors, fonts } from "../../theme";
import { AppText } from "./AppText";

type AvatarProps = {
  name: string;
  uri?: string | null;
  size?: number;
};

export const Avatar = ({ name, uri, size = 44 }: AvatarProps) => {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Image source={{ uri }} style={shape} />;
  }

  const fontSize = size * 0.42;
  return (
    <View style={[styles.fallback, shape]}>
      <AppText
        color={colors.primary}
        style={{ fontFamily: fonts.semibold, fontSize, lineHeight: fontSize * 1.4 }}
      >
        {name.trim().charAt(0).toUpperCase()}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
});

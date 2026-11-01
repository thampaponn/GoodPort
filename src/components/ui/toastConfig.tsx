import { BaseToast, ToastConfig } from "react-native-toast-message";
import { colors, fonts } from "../../theme";

const text1Style = { fontFamily: fonts.medium, fontSize: 14, fontWeight: "normal" as const, color: colors.text };

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast {...props} text1Style={text1Style} style={{ borderLeftColor: colors.success }} />
  ),
  error: (props) => (
    <BaseToast {...props} text1Style={text1Style} style={{ borderLeftColor: colors.danger }} />
  ),
};

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/ui/toastConfig";
import { AuthProvider } from "./src/context/AuthContext";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { colors, fontAssets } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <View style={styles.frame}>
          <RootNavigator />
        </View>
        <Toast config={toastConfig} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.background,
    // Keep the phone layout readable when opened in a desktop browser.
    ...(Platform.OS === "web" ? { maxWidth: 480 } : null),
  },
});

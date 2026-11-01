import Constants from "expo-constants";

const API_PORT = 3000;

// Expo already knows the LAN address it serves the bundle from, so a phone on the
// same Wi-Fi can reach the backend without anyone editing an IP by hand.
const devServerApiUrl = () => {
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  return host ? `http://${host}:${API_PORT}` : `http://localhost:${API_PORT}`;
};

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? devServerApiUrl();

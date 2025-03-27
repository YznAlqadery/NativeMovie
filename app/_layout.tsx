import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { SavedMoviesProvider } from "../context/SavedMoviesContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <SavedMoviesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="movies/[id]" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </SavedMoviesProvider>
    </AuthProvider>
  );
}

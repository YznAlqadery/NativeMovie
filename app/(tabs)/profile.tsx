import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useSavedMovies } from "@/context/SavedMoviesContext";
import { router } from "expo-router";
import { icons } from "@/constants/icons";

export default function Profile() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { savedMovies } = useSavedMovies();

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-primary px-5">
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold mb-8">
            Welcome to NativeMovie
          </Text>
          <Text className="text-light-200 text-center mb-10">
            Sign in to track your favorite movies, create watchlists, and more.
          </Text>

          <TouchableOpacity
            className="bg-accent w-full py-4 rounded-lg items-center mb-4"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-dark-100 w-full py-4 rounded-lg items-center"
            onPress={() => router.push("/auth/signup")}
          >
            <Text className="text-white font-bold text-lg">Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Generate avatar URL using user's name
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || ""
  )}&background=random&color=fff`;

  return (
    <SafeAreaView className="flex-1 bg-primary px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center mt-10">
          <Image
            source={{ uri: avatarUrl }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-white text-xl font-bold mt-4">
            {user?.name}
          </Text>
          <Text className="text-light-200">{user?.email}</Text>
        </View>

        <View className="mt-10">
          <Text className="text-white text-xl font-bold mb-5">Account</Text>

          <View className="bg-dark-100 rounded-lg overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-800"
              onPress={() => router.push("/(tabs)/saved")}
            >
              <Image
                source={icons.save}
                className="size-5 mr-3"
                tintColor="#fff"
              />
              <Text className="text-white flex-1">Saved Movies</Text>
              <Text className="text-light-200">{savedMovies.length}</Text>
              <Image
                source={icons.arrow}
                className="size-4 ml-2"
                tintColor="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center p-4 border-b border-gray-800"
              onPress={handleLogout}
            >
              <Image
                source={icons.home}
                className="size-5 mr-3"
                tintColor="#FF5757"
              />
              <Text className="text-red-500">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

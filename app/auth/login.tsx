import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";
import { icons } from "@/constants/icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      router.replace("/(tabs)/profile");
    } catch (err: any) {
      // Handle Appwrite specific errors
      if (err.code === 401) {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-5">
      <TouchableOpacity onPress={() => router.back()} className="mt-5 mb-10">
        <Image
          source={icons.arrow}
          className="size-6 rotate-180"
          tintColor="#fff"
        />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-10">Login</Text>

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <View className="mb-5">
        <Text className="text-light-200 mb-2">Email</Text>
        <TextInput
          className="bg-dark-100 text-white p-4 rounded-lg"
          placeholder="Enter your email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View className="mb-8">
        <Text className="text-light-200 mb-2">Password</Text>
        <TextInput
          className="bg-dark-100 text-white p-4 rounded-lg"
          placeholder="Enter your password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className="bg-accent py-4 rounded-lg items-center"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">Login</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-light-200">Don't have an account? </Text>
        <Link href="/auth/signup" asChild>
          <TouchableOpacity>
            <Text className="text-accent font-bold">Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

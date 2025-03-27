import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSavedMovies } from "@/context/SavedMoviesContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SavedMovieCard from "@/components/SavedMovieCard";

export default function Saved() {
  const { savedMovies, removeMovie } = useSavedMovies();

  return (
    <SafeAreaView className="flex-1 bg-primary px-5">
      <Text className="text-white text-2xl font-bold mt-10 mb-5">
        Saved Movies
      </Text>

      {savedMovies.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-light-200 text-lg">No saved movies yet</Text>
          <TouchableOpacity
            className="mt-4 bg-accent px-5 py-2 rounded-lg"
            onPress={() => router.push("/")}
          >
            <Text className="text-white font-semibold">Discover Movies</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SavedMovieCard
              movie={item}
              onRemove={() => removeMovie(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
}

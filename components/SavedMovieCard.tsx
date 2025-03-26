import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

interface SavedMovieCardProps {
  movie: MovieDetails;
  onRemove: (id: number) => Promise<void>;
}

const SavedMovieCard = ({ movie, onRemove }: SavedMovieCardProps) => {
  return (
    <TouchableOpacity
      className="flex-row mb-4 bg-dark-100 rounded-lg overflow-hidden"
      onPress={() => router.push(`/movies/${movie.id}`)}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        className="w-24 h-36"
        resizeMode="cover"
      />
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text className="text-white font-bold text-lg" numberOfLines={2}>
            {movie.title}
          </Text>
          <Text className="text-light-200 mt-1" numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-light-200">
            {movie.release_date?.split("-")[0]}
          </Text>
          <TouchableOpacity
            className="bg-red-500 px-3 py-1 rounded-full"
            onPress={() => onRemove(movie.id)}
          >
            <Text className="text-white font-semibold">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SavedMovieCard;

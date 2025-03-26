import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SavedMovieContextType {
  savedMovies: MovieDetails[];
  saveMovie: (movie: MovieDetails) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
  isMovieSaved: (movieId: number) => boolean;
}

const SavedMovieContext = createContext<SavedMovieContextType | undefined>(
  undefined
);

export const SavedMoviesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedMovies, setSavedMovies] = useState<MovieDetails[]>([]);
  // Load saved movies from AsyncStorage on component mount
  useEffect(() => {
    const loadSavedMovies = async () => {
      try {
        const savedMoviesString = await AsyncStorage.getItem("savedMovies");
        if (savedMoviesString) {
          const savedMoviesArray = JSON.parse(savedMoviesString);
          setSavedMovies(savedMoviesArray);
        }
      } catch (error) {
        console.error("Error loading saved movies:", error);
      }
    };
    loadSavedMovies();
  }, []);

  const saveMovie = async (movie: MovieDetails) => {
    try {
      const updatedMovies = [...savedMovies, movie];
      setSavedMovies(updatedMovies);
      await AsyncStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const removeMovie = async (movieId: number) => {
    try {
      const updatedMovies = savedMovies.filter((movie) => movie.id !== movieId);
      setSavedMovies(updatedMovies);
      await AsyncStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  const isMovieSaved = (movieId: number) => {
    return savedMovies.some((movie) => movie.id === movieId);
  };

  const contextValue: SavedMovieContextType = {
    savedMovies,
    saveMovie,
    removeMovie,
    isMovieSaved,
  };

  return (
    <SavedMovieContext.Provider value={contextValue}>
      {children}
    </SavedMovieContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMovieContext);
  if (!context) {
    throw new Error("useSavedMovies must be used within a SavedMoviesProvider");
  }
  return context;
};

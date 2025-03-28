// Track the searches made by a user
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie?.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  // Check if a record of that specific search has already been stored
  // If a document is fount increment the searchCount field
  // If no document is found, then create a new document in Appwrite Database
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Initialize Appwrite account
export const account = new Account(client);

// Authentication functions
export const appwriteAuth = {
  createAccount: async (email: string, password: string, name: string) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (newAccount) {
        // Log in the user after successful account creation
        return await appwriteAuth.login(email, password);
      }

      return newAccount;
    } catch (error) {
      console.error("Appwrite create account error:", error);
      throw error;
    }
  },

  // Login function
  login: async (email: string, password: string) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("Appwrite login error:", error);
      throw error;
    }
  },
  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Appwrite get current user error:", error);
      throw error;
    }
  },
  // Logout function
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Appwrite logout error:", error);
      throw error;
    }
  },
};

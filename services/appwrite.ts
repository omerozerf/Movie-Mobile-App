import {Client, Databases, ID, Query, Account} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)
const users = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ])

    if (result.documents.length > 0){
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          movie_count: existingMovie.movie_count + 1,
        }
      )
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          movie_count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      )
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('movie_count'),
    ])

    return result.documents as unknown as TrendingMovie[]
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export const createUser = async (email: string, password: string, name: string) => {
  try {
    const result = await users.create(
      ID.unique(),
      email,
      password,
      name
    );
    console.log("User created:", result);
    return result;
  } catch (error) {
    console.error("User creation failed:", error);
    throw error;
  }
}
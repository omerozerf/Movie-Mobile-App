import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "@/components/MovieCard";
import {images} from "@/constants/images";

const Save = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const saved = await AsyncStorage.getItem("savedMovies");
      setSavedMovies(saved ? JSON.parse(saved) : []);
    };
    fetchSaved();
  }, [savedMovies]);

  return (
    <View className='flex-1 bg-primary'>
      <Image className='flex-1 absolute w-full z-0' resizeMode={"cover"} source={images.bg}/>

      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        contentContainerStyle={{paddingBottom: 100}}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image
                source={icons.logo}
                className='w-12 h-10'
              />
            </View>

            <Text className='text-white text-xl font-bold my-5 text-center'>Saved Movies</Text>

            {savedMovies.length === 0 && (
              <Text className='text-gray-500 text-center mt-5'>No saved movies yet.</Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Save;
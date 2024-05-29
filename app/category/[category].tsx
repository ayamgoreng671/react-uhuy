import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const CategoryDetails = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const responses = await fetch("https://dewalaravel.com/api/categories");
      const categoriesData = await responses.json();
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : categoriesData.data;
      setCategories(categoriesArray);
      const placesData = await response.json();
      const placesArray = Array.isArray(placesData)
        ? placesData
        : placesData.data;
      setPlaces(placesArray);
    } catch (error) {
      console.error("Error fetching places:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const { category } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (categories.length > 0) {
      const selectedCategory = categories.find((cat) => cat.id == category);
      if (selectedCategory) {
        setHeaderTitle(selectedCategory.name);
      }
    }
  }, [categories, category]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: headerTitle || 'Loading...',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#ff7f36",
                borderRadius: 10,
                padding: 2,
                borderWidth: 2,
                borderColor: "#ff7f36",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ff7f36",
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Feather name="arrow-left" size={20} color={'white'} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="bookmark-outline" size={20} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            places.map((place, index) =>
              place.category.id == category ? (
                <View key={index} style={styles.contentWrapper}>
                  <Image style={styles.imageStyle} source={{ uri: place.photo }}/>
                  <Text style={styles.listingName}>{place.name}</Text>
                  <Text style={styles.listingDetails}>
                    {place.description}
                  </Text>
                </View>
              ) : null
            )
          )}
        </Animated.ScrollView>
      </View>
    </>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  listingName: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "500",
    color: Colors.black,
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  listingDetails: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  imageStyle: {
    width:"100%",
    height: 200, 
    borderRadius:20,
    elevation: 15,
  },
});

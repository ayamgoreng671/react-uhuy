import { useState, useEffect } from "react";
import React from "react";
import { Text, View } from "react-native";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

function Ayam() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const placesData = await response.json();
      // Check if data is an array, otherwise access it from a property
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

  const getCategories = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/categories");
      const categoriesData = await response.json();
      // Check if data is an array, otherwise access it from a property
      const categoriesArray = Array.isArray(categoriesData)
        ? categoriesData
        : categoriesData.data;
      setCategories(categoriesArray);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
    getCategories();
  }, []);

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          categories.map((category, index) => (
            <View key={index}>
              <Text>{category.name}</Text>
              {/* <Text>{place.category.name}</Text> */}
            </View>
          ))
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          places.map((place, index) => (
            <View key={index}>
              <Text>{place.name}</Text>
              {/* <Text>{place.category.name}</Text> */}
            </View>
          ))
        )}
      </View>
    </>
  );
}

export default Ayam;

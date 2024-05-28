import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListingCategories from "@/components/ListingCategories";

const Banteng = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    getCategories();
  }, []);
  return (
    <View>
      <ListingCategories listings={categories}  />
    </View>
  );
};

export default Banteng;

const styles = StyleSheet.create({});

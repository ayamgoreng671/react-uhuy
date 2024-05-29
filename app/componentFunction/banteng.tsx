import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListingCategories from '@/components/ListingCategories';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const Banteng = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCategories = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/categories");
      const categoriesData = await response.json();
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : categoriesData.data;
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
    <NativeViewGestureHandler>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <ListingCategories listings={categories} />
        )}
      </View>
    </NativeViewGestureHandler>
  );
};

export default Banteng;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Listings from '@/components/Listings'

const Kuda = () => {

    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const getPlaces = async () => {
      try {
        const response = await fetch("https://dewalaravel.com/api/places");
        const placesData = await response.json();
        // Check if data is an array, otherwise access it from a property
        const placesArray = Array.isArray(placesData) ? placesData : placesData.data;
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
  return (
    <View>
      <Listings listings={places}  />
    </View>
  )
}

export default Kuda

const styles = StyleSheet.create({})
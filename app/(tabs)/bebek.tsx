import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ListRenderItem } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import {Colors} from "@/constants/Colors";
import { FontAwesome5 ,Ionicons } from "@expo/vector-icons";


interface Place {
  id: number;
  name: string;
  slug: string;
  photo: string;
  description: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Bebek = () => {
  const [places, setPlaces] = useState([]);
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

  useEffect(() => {
    getPlaces();
  }, []);

  const renderItems: ListRenderItem<Place> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
            <View style={styles.bookmark}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={Colors.white}
              />
            </View>
            <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={18}
                  color={Colors.primaryColor}
                />
                <Text style={styles.itemLocationTxt}>{item.location}</Text>
              </View>
              <Text style={styles.itemPriceTxt}>${item.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          places.map((place, index) => (
            <View key={index}>
              <div className="container">
                <div className="row row-gap-3">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">{place.name}</h3>
                        <p className="card-text">{place.name}</p>
                        <a href="#" className="btn btn-primary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div> */}
              {/* <Text>{place.category.name}</Text> */}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Bebek;

const styles = StyleSheet.create({
    item: {
      backgroundColor: Colors.white,
      padding: 10,
      borderRadius: 10,
      marginRight: 20,
      width: 220,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 30,
    },
    bookmark: {
      position: "absolute",
      top: 185,
      right: 30,
      backgroundColor: Colors.primaryColor,
      padding: 10,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: Colors.white,
    },
    itemTxt: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.black,
      marginBottom: 10,
    },
    itemLocationTxt: {
      fontSize: 12,
      marginLeft: 5,
    },
    itemPriceTxt: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.primaryColor,
    },
  });
  

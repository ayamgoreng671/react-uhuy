import React from 'react';
import { Image, StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Banteng from '../componentFunction/banteng';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const getPlaces = async () => {
    try {
      const response = await fetch("https://dewalaravel.com/api/places");
      const placesData = await response.json();
      const placesArray = Array.isArray(placesData) ? placesData : placesData.data;
      setPlaces(placesArray);
      setFilteredPlaces(placesArray);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    const filtered = places.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlaces(filtered);
  }, [searchQuery, places]);

  const renderItems = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={styles.cardtext}>
              <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
                {item.name} |
              </Text>
              <View style={styles.highlightWrapper}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.highlightIcon}>
                    <Ionicons
                      name="time"
                      size={18}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.highlightTxt}>24 jam</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.highlightIcon}>
                    <FontAwesome
                      name="users"
                      size={18}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.highlightTxt}>1,5RB</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.highlightIcon}>
                    <Ionicons
                      name="star"
                      size={18}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.highlightTxt}>9.7</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.itemDesc} numberOfLines={3} ellipsizeMode="tail">
                {item.description} |
              </Text>
              <Text style={styles.category} numberOfLines={1}>
                {item.category.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          style={styles.bannerLogo}
          source={require('@/assets/images/banner.png')}
        />
      }
    >
      <View style={styles.titleContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.textInput}
          placeholder='Search here...'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <GestureHandlerRootView style={{ width: "100%", justifyContent: "flex-start" }}>
        <Banteng />
      </GestureHandlerRootView>
      <FlatList
        data={filteredPlaces}
        renderItem={renderItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={isLoading ? <Text>Loading...</Text> : <Text>No places found.</Text>}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bannerLogo: {
    height: 250,
    width: 360,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  textInput: {
    borderWidth: 3,
    borderColor: "#ff7f36",
    paddingVertical: 7,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 20,
    width: "100%",
  },
  itemAPI: {
    display: "flex",
    marginHorizontal: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ff7f36",
    borderRadius: 10,
    backgroundColor: "#ff7f36",
  },
  places: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    marginVertical: 5,
  },
  itemPlaces: {
    borderWidth: 2,
    marginBottom: 30,
    paddingBottom: 5,
    borderRadius: 15,
    borderColor: "white",
    elevation: 5,
  },
  item: {
    backgroundColor: Colors.white,
    width: "100%",
    marginBottom: 25,
    borderRadius: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    elevation: 5,
  },
  itemTxt: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 10,
  },
  cardtext: {
    display: "flex",
    backgroundColor: "#E65C19",
    borderLeftColor: "#E65C19",
    borderRightColor: "#E65C19",
    borderBottomColor: "#E65C19",
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  category: {
    display: "flex",
    alignSelf: "flex-end",
    width: 85,
    height: 22,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 15,
    marginRight: 15,
    backgroundColor: "white",
    color: Colors.black,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 12,
  },
  itemDesc: {
    display: "flex",
    width: 270,
    flexWrap: "wrap",
    marginHorizontal: 10,
    marginBottom: 15,
    fontWeight: "500",
    color: "white",
  },
  highlightWrapper: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 13,
    columnGap: 15,
  },
  highlightIcon: {
    padding: 5,
    backgroundColor: Colors.secondaryColor,
    marginRight: 3,
    borderRadius: 5,
  },
  highlightTxt: {
    color: Colors.secondaryColor,
    fontWeight: "500",
  },
});

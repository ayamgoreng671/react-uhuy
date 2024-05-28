import { ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface Category {
    id: number;
    name: string;
    slug: string;
  }
  type Props = {
    listings: any[];
  };

const ListingCategories = ({ listings }: Props) => {
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      console.log('Update Listing');
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false)
      }, 200);
    },);
  
    const renderItems: ListRenderItem<Category> = ({ item }) => {
      return (
        <Link href={`/category/${item.id}`} asChild>
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
                  {/* <Text style={styles.itemLocationTxt}>{item.location}</Text> */}
                </View>
                {/* <Text style={styles.itemPriceTxt}>${item.price}</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      );
    };
  
    return (
      <View>
        <FlatList
          data={loading ? [] : listings}
          renderItem={renderItems}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  
  export default ListingCategories;
  
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
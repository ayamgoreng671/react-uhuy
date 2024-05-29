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
  
    const renderItems: ListRenderItem<Category> = ({ item }) => {
      return (
        <Link href={`/category/${item.id}`} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
              <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
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
      display: "flex",
      marginHorizontal: 5,
      padding: 7,
      borderWidth: 2,
      borderColor: "#ff7f36",
      borderRadius: 10,
      backgroundColor: "#ff7f36",
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 30,
    },
    itemTxt: {
      fontSize: 16,
      fontWeight: "600",
      color: "white",
    },
  });
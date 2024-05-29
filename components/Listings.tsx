import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
//   import { ListingType } from "@/types/listingType";
  import {Colors} from "@/constants/Colors";
  import { FontAwesome5, Ionicons } from "@expo/vector-icons";
  import { Link } from "expo-router";
  

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

  type Props = {
    listings: any[];
  };
  
  const Listings = ({ listings }: Props) => {
    const [loading, setLoading] = useState(false);
  
    // useEffect(() => {
    //   console.log('Update Listing');
    //   setLoading(true);
  
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 200);
    // },);
  
    const renderItems: ListRenderItem<Place> = ({ item }) => {
      return (
        <Link href={`/listing/${item.id}`} asChild>
          <TouchableOpacity>
            <View style={styles.item}>
              <Image source={{ uri: item.photo }} style={styles.image} />
              <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
                {item.name} |
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
        />
      </View>
    );
  };
  
  export default Listings;
  
  const styles = StyleSheet.create({
    item: {
      backgroundColor: Colors.white,
      borderRadius: 15,
      width: "100%",
      marginBottom: 25,
      borderWidth: 2,
    },
    image: {
      width: "100%",
      height: 200,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
    },
    itemTxt: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.black,
      marginVertical: 10,
      marginLeft: 10,
    },
  });
  
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
  import { FontAwesome } from "@expo/vector-icons";
  

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
  
    const renderItems: ListRenderItem<Place> = ({ item }) => {
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
  
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const Naga = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([
    // { id: '1', name: 'Apple' },
    // { id: '2', name: 'Banana' },
    // { id: '3', name: 'Orange' },
    // { id: '4', name: 'Pineapple' },
    // { id: '5', name: 'Mango' },
    // Add more items as needed
  ]);

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
      setItems(placesArray);
    } catch (error) {
      console.error("Error fetching places:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Naga;

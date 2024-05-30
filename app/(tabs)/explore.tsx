import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sebenarnya Halaman ini tadinya tidak niatan untuk di buat, tetapi karena sang Developer gabut jadinya sengaja kebuat dengan sendirinya</Text>
      <Text style={styles.paragraph}>Singat saja ini lah Kami :</Text>
      <Text style={styles.paragraph}>Muhammad Rashad Fawzy AL - Baariq | Single Page Function Improvement</Text>
      <Text style={styles.paragraph}>Muhammad Raditya Javana | Logic Function Maker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  paragraph: {
    fontSize: 24,
    fontWeight: "400",
    marginVertical: 12,
  }
});

export default explore;


import React from 'react';
import { Image, StyleSheet, TextInput, View, Text, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Banteng from './banteng';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Kuda from './kuda';

export default function HomeScreen() {
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
          style={styles.textInput}
          placeholder='Search here...'
        />
      </View>
      <ScrollView horizontal style={styles.category}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Banteng />
      </GestureHandlerRootView>
      </ScrollView>
      <ScrollView>
        <Kuda/>
      </ScrollView>
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
  category: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
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
  item: {
    color: 'white',
    fontWeight: "500",
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
  }
});

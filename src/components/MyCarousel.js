import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { hourDayMonth } from '../utils/dates'


const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = ({entries, onPress}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity onPress={()=>onPress(item)} style={styles.item}>
        <ParallaxImage
          source={{uri: item.image}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={styles.containerText}>
        <LinearGradient 
        colors={[ 'rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        style={[styles.linearGradient]}>

        <Text style={styles.date} numberOfLines={2}>
          {hourDayMonth(item.date)}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
          </LinearGradient>

                    

        </View>
       
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 70}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    maxHeight: screenWidth - 220,
   alignItems: 'center'
  },
  item: {
    width: screenWidth - 70,
    height: screenWidth - 220,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
  },
  containerText: {
    position: 'absolute',
    width: '100%',
    bottom:0,
  },
  description:{
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginBottom: 10,
  },
  date: {
    color: '#f4511e',
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
  },
  linearGradient: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 50
  },

});
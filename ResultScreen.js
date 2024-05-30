import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function ResultScreen({ route, navigation }) {
  // Initialize state variables
  const [showCategories, setShowCategories] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [renderedImageUrl, setRenderedImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [outlierProductCategory, setOutlierProductCategory] = useState('');
  const [productCount, setProductCount] = useState('');
  const [outlierProductCount, setOutlierProductCount] = useState('');
  const [totalProductCount, setTotalProductCount] = useState('');
  const [relationshipRatio, setRelationshipRatio] = useState('');

  // Fetch data from AsyncStorage when the component is mounted or when route.params change
  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      // Retrieve stored data from AsyncStorage
      const fetchedRenderedImageUrl = await AsyncStorage.getItem('renderedImageUrl');
      const fetchedCategory = await AsyncStorage.getItem('category');
      const fetchedOutlierProductCategory = await AsyncStorage.getItem('outlierProductCategory');
      const fetchedProductCount = await AsyncStorage.getItem('productCount');
      const fetchedOutlierProductCount = await AsyncStorage.getItem('outlierProductCount');
      const fetchedTotalProductCount = await AsyncStorage.getItem('totalProductCount');
      const fetchedRelationshipRatio = await AsyncStorage.getItem('relationshipRatio');
      
      // Update state variables with the retrieved data
      setRenderedImageUrl(fetchedRenderedImageUrl);
      setCategory(fetchedCategory);
      setOutlierProductCategory(fetchedOutlierProductCategory);
      setProductCount(fetchedProductCount);
      setOutlierProductCount(fetchedOutlierProductCount);
      setTotalProductCount(fetchedTotalProductCount);
      setRelationshipRatio(fetchedRelationshipRatio);
    };

    fetchAsyncStorageData();
  }, [route.params]);

  // Toggle the visibility of categories and overlay
  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setShowOverlay(!showCategories);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: renderedImageUrl }} style={styles.image} />




      {showOverlay && (
        <View style={styles.overlay}>
          <View style={styles.analyze}>
            
          <Text style={styles.content}>• Category: {category}</Text>
            <Text style={styles.content}>• Outlier Product Categories: {outlierProductCategory}</Text>
            <Text style={styles.content}>• Outlier Product Count: {outlierProductCount}</Text>
            <Text style={styles.content}>• Product Count: {productCount}</Text>
            <Text style={styles.content}>• Relationship Ratio: {relationshipRatio}</Text>
            <Text style={styles.content}>• Total Product Count: {totalProductCount}</Text>
            
            
          </View>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={toggleCategories} style={styles.button}>
          <Text style={styles.buttonText}>{showCategories ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
        <View style={styles.refresh}>
          <TouchableOpacity onPress={() => navigation.navigate('Camera', { key: Date.now() })}>
            <Feather name="refresh-ccw" size={24} color="#3CB371" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width:screenWidth,
    height:screenHeight
  },
  image: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    resizeMode:'contain'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  analyze: {
    justifyContent: 'space-between',
    width: screenWidth - 60,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#3CB371',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  refresh: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 24,
    color: '#3CB371',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    fontWeight: '600',
    color: '#F5F5F5',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  listItem: {
    fontWeight: '600',
    color: '#F5F5DC',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

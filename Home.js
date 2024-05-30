import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

class Home extends Component {

  constructor(props) {
    // Initialize state variables
    super(props);
    this.state = {
      image: null,
      username: '',
      loading: false,
      dailyLimit: 3,
    };
  }
  

  
 

  async componentDidMount() {
    try {
      // Retrieve stored username from AsyncStorage
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        Alert.alert("Login Required", "Please log in to create a post.");
      }
      this.setState({ username: storedUsername });
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  }

  
  // Method to pick an image from the image library
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.canceled) {
      this.setState({ selectedImage: result.assets[0].uri });
    }
  };
  
  
  
  // Method to handle the submission of the selected image and username
  handleSubmit = async () => {
    const { selectedImage, username } = this.state;

    if (!username) {
      Alert.alert("Missing Data", "Please ensure you are logged in.");
      return;
    }
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please select an image before submitting.");
      return;
    }

    this.setState({ loading: true });
    // Create a FormData object to send the image and username
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage || resolvedAssetSource.uri,
      type: 'image/jpeg',
      name: 'selected_image.jpg',
    });
    formData.append('username', username);
    try {
      // Send the image and username to the backend
      const response = await fetch('http://192.168.1.13:8089/shelf', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        this.setState({ loading: false });
        Alert.alert("Error", responseText);
        return;
      }

      const responseData = await response.json();

      const {
        renderedImageUrl,
        category,
        outlierProductCategory,
        productCount,
        outlierProductCount,
        totalProductCount,
        relationshipRatio
      } = responseData;

      console.log('Response Data:', {
        renderedImageUrl,
        category,
        outlierProductCategory,
        productCount,
        outlierProductCount,
        totalProductCount,
        relationshipRatio
      });
      // Store the response data in AsyncStorage
      await AsyncStorage.setItem('renderedImageUrl', renderedImageUrl);
      await AsyncStorage.setItem('category', category);
      await AsyncStorage.setItem('outlierProductCategory', outlierProductCategory);
      await AsyncStorage.setItem('productCount', JSON.stringify(productCount));
      await AsyncStorage.setItem('outlierProductCount', JSON.stringify(outlierProductCount));
      await AsyncStorage.setItem('totalProductCount', JSON.stringify(totalProductCount));
      await AsyncStorage.setItem('relationshipRatio', JSON.stringify(relationshipRatio));

      this.setState({ loading: false });
      Alert.alert("Success", "The image rendered successfully.");
      console.log('Saved values to AsyncStorage');
      //Silinecek
      this.state.dailyLimit=this.state.dailyLimit - 1;

      // Navigate to the Result screen
      const navigation = this.props.navigation; 
      navigation.navigate('Result');

    } catch (error) {
      console.error('Error sending image:', error);
      this.setState({ loading: false });
      Alert.alert("Error", "Failed to sending the image: " + error.message);
    }
  };



  render() {

    return (
      <View style={{flex:1,  backgroundColor: '#f0f0f0',}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.photoContainer} onPress={this.pickImage}>
          {this.state.selectedImage ? (
            <Image source={{ uri: this.state.selectedImage }} style={styles.image} />
          ) : (
            <MaterialIcons name="library-add" size={24} color="black" />
            
          )}
        </TouchableOpacity>

       

        {this.state.loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.submitContainer} onPress={this.handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          )}
        <View style={styles.infoCard}>
          <Text>Daily Limit: {this.state.dailyLimit}</Text>
          <TouchableOpacity style={[styles.premiumContainer,{marginTop:10}]}>
              <Text style={styles.submitText}>♕ Premium Access ♕</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop:50,
    
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 330,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitContainer: {
    borderRadius: 8,
    width: '50%',
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
  infoCard:{
    marginTop:10,
    padding:10
  },
  premiumContainer: {
    borderRadius: 8,
    width: '60%',
    padding: 10,
    backgroundColor: '#FF9800',
  },

});

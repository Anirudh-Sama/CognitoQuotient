import React, { useState,useLayoutEffect } from 'react';
import { View, Button, Image, StyleSheet, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from '../constants/theme'; // Update the path accordingly

const FileUpload = () => {
  useLayoutEffect(() => {
    navigation.setOptions(
      {
       headerShown : false, 
      }
    )
}, [])
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseData, setResponseData] = useState(null); // State to store response data
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', {
      uri: selectedImage,
      type: 'video/mp4',
      name: 'video.mp4',
    });

    try {
      const response = await axios.post('http://192.168.1.19:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      setResponseData(response.data); // Store response data
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigateToResult = () => {
    if (responseData) {
      navigation.navigate('result', { data: responseData });
    } else {
      alert('No response data available. Please upload an image first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: COLORS.primary }]}>Upload File</Text>
      <Button title="Pick a Video" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Upload" onPress={uploadImage} />
      <Button title="Go to Result" onPress={navigateToResult} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 24,
    marginBottom: SIZES.base * 2,
  },
  buttonContainer: {
    marginTop: SIZES.base * 2,
    width: '80%',
    justifyContent: 'space-between',
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    marginVertical: SIZES.base * 2,
  },
  navigationButton: {
    marginTop: SIZES.base,
  },
});

export default FileUpload;

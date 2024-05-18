import { View, Text,Image,TouchableOpacity } from 'react-native'
import React ,{useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import appicon from '../assets/images/appicon.png'
import { StatusBar } from 'expo-status-bar';
import Box from '../components.js/Box';


export default function Disc() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
      navigation.setOptions(
        {
         headerShown : false, 
        }
      )
  }, [])
    
      
    
   
  return (
    
      
      
    <View className="flex-1 justify-start items-center  bg-[#252c4a]">
        
      <Text className = "text-3xl justify-self-start text-white my-10 dark:text-white">BEFORE STARTING THE TEST !</Text>
      <Image source={require('../assets/images/istock.jpg')} className = "object-contain h-60 w-96 rounded-lg" />
      <View className="flex-1 justify-center items-center">
      <Box  />
      </View>
    </View>
  )
}
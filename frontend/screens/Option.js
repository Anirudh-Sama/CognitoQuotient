import { View, Text,Image,TouchableOpacity } from 'react-native'
import React ,{useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import appicon from '../assets/images/appicon.png'
import { StatusBar } from 'expo-status-bar';
import Box from '../components.js/Box';


export default function Option() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions(
          {
           headerShown : false, 
          }
        )
    }, [])
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-[#252c4a]">

      <Text className = "text-6xl text-white dark:text-white">Select test</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('disclaimer')} className ="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <Text className = "text-4xl font-semibold text-gray-900 dark:text-white">IQ Test</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> navigation.navigate('a')}  className ="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <Text className = "text-4xl font-semibold text-gray-900 dark:text-white">EQ Test</Text>
       </TouchableOpacity>
    </View>
  )
}
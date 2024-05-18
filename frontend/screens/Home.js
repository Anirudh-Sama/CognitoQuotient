import { View, Text,Image,TouchableOpacity } from 'react-native'
import React ,{useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import appicon from '../assets/images/appicon.png'
import { StatusBar } from 'expo-status-bar';

export default function Home() {
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
      <StatusBar style='light' />
       {/* logo  image with rings*/}
       <View className="bg-white/20 rounded-full ">
                <View className="bg-white/20 rounded-full" >
                    <Image
                        source={appicon} style={{ width: 400 ,height: 400}} />
                </View>
                </View>
                <View>
            <Text style = {{fontSize: 50}} className = "text-white text-center font-bold tracking-widest my-10" >Cognito Quotient</Text>
            <Text style = {{fontSize: 20}} className = "text-white font-semibold tracking-widest ">Unlocking personalities, Decoding minds..</Text>

        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('options')} className ="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <Text className = "text-white text-center font-bold">Get Started</Text>
       </TouchableOpacity>
    </View>
  )
}


import { View, Text, ImageBackground,SafeAreaView } from 'react-native'
import React from 'react'
import beachImage from "@/assets/meditation-images/beach.webp"
import CustomButton from '@/components/CustomButton'
import {LinearGradient} from 'expo-linear-gradient'
import { useRouter } from 'expo-router'

const App = () => {
  const router = useRouter()
  return (
    <View className='flex-1'>
      <ImageBackground
       source={beachImage}
       resizeMode='cover'
       className='flex-1'
      >
        <LinearGradient
        className='flex-1'
        colors={["rgba(0,0,0,0.4)","rgba(0,0,0,0.8)"]}
        >
        <SafeAreaView className='flex-1 mx-5 my-12 justify-between mt-20 '>
          {/* Use the expo linear gradient  */}
          <View>
          <Text className='text-center text-white font-bold text-4xl'>Simple Meditation</Text>
          <Text className='text-center text-white font-medium text-2xl'>Simplifying meditation for everyone</Text>
          </View>
          <View>
            <CustomButton 
              onPress={()=>router.push('/nature-meditate')}
              title='Get Started'            
            />
          </View>
        </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default App
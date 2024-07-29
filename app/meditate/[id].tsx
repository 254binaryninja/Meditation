import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router'
import AppGradient from '@/components/AppGradient'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import { AntDesign } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA,AUDIO_FILES } from '@/constants/meditationData'
import { TimeContext } from '@/context/TimerContext'


const Meditate = () => {

  const {duration:seconds,setDuration} = useContext(TimeContext)
  const {id} = useLocalSearchParams();
  const [isMeditating,setIsMeditating] = useState<boolean>();
  const [audioSound,setSound]  = useState<Audio.Sound>();
  const [isPlayingAudio,setPlayingAudio] = useState<boolean>();

  useEffect(()=>{
    let timerId:NodeJS.Timeout;

    //Exit
    if(seconds === 0){
      setIsMeditating(false)
      return;
    }

    if(isMeditating) {
      timerId = setTimeout(()=>{
        setDuration(seconds-1);
      },1000)
   }
    
    return ()=>{
      clearTimeout(timerId)
    }

  },[seconds,isMeditating]);

  useEffect(()=>{
    return ()=> {
      audioSound?.unloadAsync();
    }
  },[audioSound])

    const toggleMeditationStatus = async () => {
      if (seconds === 0) setDuration(10)

        setIsMeditating(!isMeditating)

        await toggleSound();
    }

    const initializeSound = async () => {
      const audioFileName = MEDITATION_DATA[Number(id)-1].audio;

      const {sound} = await Audio.Sound.createAsync(
        AUDIO_FILES[audioFileName]
      )
       setSound(sound)
       return sound;
    }

    const toggleSound = async () => {
      const sound =  audioSound ? audioSound : await initializeSound();

      const status = await sound?.getStatusAsync();

      if(status?.isLoaded && !isPlayingAudio){
        await sound.playAsync();
        setPlayingAudio(true)
      }else{
        await sound.pauseAsync();
        setPlayingAudio(false)
      }
    }

    const handleAdjustDuration = async () => {
      if (isMeditating) toggleMeditationStatus();

      router.push('/(modal)/adjust-duration')
    }

    const formattedTimeMinutes = String(
      Math.floor(seconds / 60)
  ).padStart(2, "0");
  
  const formattedTimeSeconds = String(seconds % 60).padStart(2, "0");


  return (
    <View className='flex-1'>
      <ImageBackground
       source={MEDITATION_IMAGES[Number(id)-1]}
       resizeMode='cover'
       className='flex-1'
      >
        <AppGradient
        colors={["transparent","rgba(0,0,0,0.4)","rgba(0,0,0,0.8)"]}
        >
         <Pressable onPress={()=>router.back()} className='absolute top-16 left-6 z-10'>
         <AntDesign
                 name='leftcircleo'
                 size={40}
                 color='white'               
               />
         </Pressable>
         <View className='flex-1 justify-center'>
            <View className='mx-auto bg-neutral-50 rounded-full w-44 h-44 justify-center items-center '>
             <Text className='text-blue-800 text-4xl '>{formattedTimeMinutes}:{formattedTimeSeconds}</Text>
            </View>
         </View>
         <View className='mb-5'>
            <CustomButton
              title={isMeditating ? 'Stop' : 'Start Meditating'}
              onPress={toggleMeditationStatus}
              containerStyles={isMeditating ? 'opacity-30': ''}
            />

             <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
              containerStyles='mt-10'
            />
         </View>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}

export default Meditate
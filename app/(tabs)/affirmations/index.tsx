import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmationGallery'
import GuidedAffirmationsGallery from '@/components/GuidedAffirmationsGallery'

const Affirmations = () => {
  return (
    <View className='flex-1'>
      <AppGradient
       colors={["#2e1f58","#54426b","#a790af"]}
      >
        <ScrollView showsHorizontalScrollIndicator={false}>
           <Text className='text-zinc-50 font-bold text-3xl'>Change your beliefs with affirmations</Text>
           <View>
            {AFFIRMATION_GALLERY.map((g)=>(
                <GuidedAffirmationsGallery
                key={g.title}
                title={g.title}
                previews={g.data}
                />
            ))}
           </View>
        </ScrollView>
        
      </AppGradient>
    </View>
  )
}

export default Affirmations
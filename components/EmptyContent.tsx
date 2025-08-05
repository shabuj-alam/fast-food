import { images } from '@/constants'
import React from 'react'
import { Image, Text, View } from 'react-native'

const EmptyContent = () => {
  return (
    <View className='flex-center'>
      <Image 
        source={images.emptyState}
        className='size-52'
        resizeMode="contain"
      />
      <Text className='h3-bold text-black'>Nothing matched your search</Text>
      <Text className='paragraph-bold text-gray-200'>Try a different search term or check for typos.</Text>
    </View>
  )
}

export default EmptyContent
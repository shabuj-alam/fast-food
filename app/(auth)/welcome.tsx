import CustomeButton from '@/components/CustomeButton'
import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { Redirect } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Welcome = () => {

  const { isAuthenticated } = useAuthStore();

  const submit = () => {
    useAuthStore.getState().fetchAuthenticatedUser();
    if(isAuthenticated) return <Redirect href="/" />;  
  }
  

  return (
    <View className='gap-10 flex-center bg-white rounded-lg p-5 mt-5'>
      {/* <View className='w-10 h-1 bg-gray-100 mb-5'/> */}
      <Image 
        source={images.success}
        className='size-60'
        resizeMode='contain'
      />
      <Text className='h3-bold'>Login Successful</Text>
      <Text className='base-regular text-gray-100'>You&apos;re all set to continue where you left off.</Text>
      <CustomeButton 
        title='Go to Homepage'
        onPress={submit}
      />
    </View>
  )
}

export default Welcome
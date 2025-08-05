import CustomeButton from '@/components/CustomeButton'
import CustomHeader from '@/components/CustomHeader'
import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { ProfileContentProps } from '@/type'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileContent = ({imageUrl, title, desc}:ProfileContentProps) => {
  return (
    <View className="flex-row">
      <View className="flex-center bg-[#FFF8F0] rounded-full size-16">
        <Image
          source={imageUrl}
          className="absolute size-6"
          resizeMode="contain"
        />
      </View>
      <View className="flex flex-start pl-5">
        <Text className="paragraph-medium text-gray-200">{title}</Text>
        <Text className="base-semibold">{desc}</Text>
      </View>
    </View>
  );
}

const Profile = () => {

  const { user } = useAuthStore();

  console.log("USER", JSON.stringify(user, null, 2));

  return (
    <SafeAreaView className='bg-white h-full'>
      <View className='px-5 pt-5'>
          <CustomHeader title="Profile" />
      </View>

      <View className='flex-center'>
        <Image 
          source={{ uri: user!.avatar }}
          className='size-32 rounded-full'
        />

        <View className='mt-10 px-5 pt-5 w-full'>
          <View className='flex justify-between bg-white rounded-2xl p-6 shadow-md shadow-dark-100/10 gap-4'>
              <ProfileContent imageUrl={images.user} title="Full Name" desc={user!.name}/>
              <ProfileContent imageUrl={images.envelope} title="Email" desc={user!.email}/>
              <ProfileContent imageUrl={images.phone} title="Phone" desc="+35312345678"/>
              <ProfileContent imageUrl={images.location} title="Address" desc="123 Main Street, Springfield, IL 62704"/>
          </View>
        </View>

        <View className='w-full px-8 gap-4 mt-6'>
          <CustomeButton 
            title='Edit Profile'
            style='h-16 bg-[#FFF8F0] border-[#FE8C00]' 
            textStyle="text-[#FE8C00]"
          />
           <CustomeButton 
            title='Logout'
            leftIcon={<Image source={images.logout} className='size-6 mt-2' resizeMode='contain'/>} 
            style='h-16 bg-[#FAF1F1] border-[#F14141]' 
            textStyle="ml-4 text-[#F14141]"
          />
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default Profile
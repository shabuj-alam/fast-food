import CustomeButton from '@/components/CustomeButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import * as Sentry from '@sentry/react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { isLoading } = useAuthStore();

  const submit = async() => {

    const {email, password} = form;

    if(!email || !password) return Alert.alert('Error','Please enter valid email & Password.');

    setIsSubmitting(true);

    try {
      await signIn({email, password});
      router.push('/welcome');
    } catch(error: any){
      Alert.alert('Error', error.message);
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

        <CustomInput
          placeholder="Eneter your email"
          value={form.email}
          onChangeText={(text)=> setForm((prev)=>({...prev, email: text}))}
          label="Email"
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Eneter your password"
          value={form.password}
          onChangeText={(text)=> setForm((prev)=>({...prev, password: text}))}
          label="Password"
          secureTextEntry={true}
        />
        <CustomeButton 
          title='Sign In'
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Don&apos;t have an account?
          </Text>
          <Link href="/sign-up" className='base-bold text-primary'>
            Sign Up
          </Link>
        </View>
    </View>
  )
}

export default SignIn
import CustomeButton from '@/components/CustomeButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const submit = async() => {

    const {name, email, password} = form;

    if(!name || !email || !password) return Alert.alert('Error','Please enter valid name, email & Password.');

    setIsSubmitting(true);

    try {

      await createUser({
        name,
        email,
        password
      })
      router.replace('/');
    } catch(error: any){
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>

        <CustomInput
          placeholder="Eneter your name"
          value={form.name}
          onChangeText={(text)=> setForm((prev)=>({...prev, name: text}))}
          label="Name"
        />

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
          title='Sign Up'
          isLoading={isSubmitting}
          onPress={submit}
        />

        <View className='flex justify-center mt-5 flex-row gap-2'>
          <Text className='base-regular text-gray-100'>
            Already have an account?
          </Text>
          <Link href="/sign-in" className='base-bold text-primary'>
            Sign In
          </Link>
        </View>
    </View>
  )
}

export default SignUp;
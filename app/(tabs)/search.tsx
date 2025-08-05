import CartButton from '@/components/CartButton'
import EmptyContent from '@/components/EmptyContent'
import Filter from '@/components/Filter'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import { getCategories, getMenu } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { MenuItem } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {

  const { category, query } = useLocalSearchParams<{category:string, query: string}>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 4
    }
  });

  const { data: categories } = useAppwrite({
    fn: getCategories
  })

  useEffect(() => {
    refetch({category, query, limit: 4})
  }, [category, query]);
  

  // console.log(JSON.stringify(data, null, 2));

  return (
    <SafeAreaView className='bg-white h-full'>

      {/* <Button 
        title='Seed' 
        onPress={()=> seed().catch((error) => console.log('Faild to seed the database', error))}
      /> */}

        <FlatList 
          data={data}
          keyExtractor={item => item.$id}
          numColumns={2}
          columnWrapperClassName='gap-7'
          contentContainerClassName='gap-7 px-5 pb-32'
          renderItem={({item, index})=>{
            const isFirstRightColItem = index % 2 === 0;
            return(
              <View className={cn('flex-1 max-w-[48%] h-auto', !isFirstRightColItem ? 'mt-10' : 'mt-0' )}>
                <MenuCard 
                  item={item as unknown as MenuItem}
                />
              </View>
            )
          }}
          ListHeaderComponent={() => (
            <View className='my-5 gap-5'>
              <View className='flex-between flex-row w-full'>
                <View className='flex-start'>
                  <Text className='small-bold uppercase text-primary'> Search </Text>

                  <View className='flex-start flex-row gap-x-1 mt-0.5'>
                    <Text className='paragraph-semibold text-dark-100'>
                      Find your favourite food
                    </Text>
                  </View>
                </View>

                <CartButton />
              </View>

              <SearchBar />

              <Filter categories={categories!}/> 

            </View>
          )}
          ListEmptyComponent={()=> !loading && (
            <View className='flex-center mt-10'>
              <EmptyContent />
            </View>
          )}
        />

    </SafeAreaView>
    
  )
}

export default Search
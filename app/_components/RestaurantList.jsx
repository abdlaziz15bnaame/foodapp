"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import { useSearchParams } from 'next/navigation';
import RestaurantCard from './RestaurantCard';

function RestaurantList() {
    const params = useSearchParams()
    const [categories, setCategories] =useState("All");
    const [restaurant,setRestaurant] = useState([]);

    useEffect(()=>{
        params&&setCategories(params.get('category'));
        params&&getRestaurantsList(params.get('category'));
    },[params])


        const getRestaurantsList =  (category) => {
            GlobalApi.getRestaurant(category).then(resp=>{
                console.log(resp);
                setRestaurant(resp?.restaurants);
            });
            
        }
  return (

    <div className='mt-9 '>

      <div className='flex items-center gap-5'>

      
    <h2 className="relative inline-block text-[#2e3082] text-2xl font-bold after:content-[''] after:block after:absolute after:left-0 after:bottom-[-8px] after:w-2/2 after:h-[3px] after:bg-[#F42600] mb-12">
  Popular {categories} Restaurants
</h2>

<h2 className='text-[#F42600]  font-bold'>{restaurant?.length} Results</h2>
 </div>

 <div className='grid grid-col-1 md:grid-cols-4  gap-15'>
  {restaurant.map((res)=>(
      <RestaurantCard key={res.id} res={res}/>
  ))}
 </div>
</div>
  )
}

export default RestaurantList
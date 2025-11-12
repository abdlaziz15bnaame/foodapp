"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { UpdateCartContext } from '@/app/_components/_context/UpdateCartContext';
import ReviewSection from '@/app/_components/ReviewSection';
import { toast } from 'sonner';

function RestaurantsDetails() {
  const { user } = useUser();
  const { cartItems, setCartItems } = useContext(UpdateCartContext);
  const { name } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    GlobalApi.restaurantDetails(name).then((resp) => {
      setRestaurant(resp?.restaurant);
      setCartItems(!cartItems);
      setLoading(false);
    });
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#FFF0E5] to-[#FFE0C2] animate-pulse">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#EC6628] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#EC6628] font-bold text-xl">Loading Restaurant...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <p className="text-center mt-10 text-red-500 text-2xl font-bold">Restaurant not found</p>;
  }

  const handleAddToCart = (item) => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      productName: item?.name,
      productDescription: item?.description,
      price: item?.price,
      productImageId: item?.productImage?.id,
    };

    GlobalApi.AddToCart(data).then(
      () => {
        toast.success("🛒 Item added to cart");
        setCartItems(prev => prev + 1);
      },
      () => toast.error("Failed to add item ❌")
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0E5] via-[#FFE0C2] to-[#FFD1A4] p-12">
      {/* Banner */}
      {restaurant?.banner?.url && (
        <div className="relative w-full h-96 md:h-[500px] mb-16 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-700">
          <Image
            src={restaurant.banner.url}
            alt={restaurant.name || "Restaurant banner"}
            fill
            className="object-cover brightness-90 hover:brightness-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 bg-white rounded-3xl shadow-xl p-8 border-l-8 border-[#EC6628] hover:shadow-2xl transition-shadow duration-500">
        <div className="space-y-6">
          <p className="text-gray-700 font-bold flex items-center gap-3">
            🏠 <span className="text-[#EC6628]">Address:</span> {restaurant?.address || 'N/A'}
          </p>
          <p className="text-gray-700 font-bold flex items-center gap-3">
            🍽 <span className="text-[#EC6628]">Type:</span> {restaurant?.restuarantType || 'N/A'}
          </p>
          <p className="text-gray-700 font-bold flex items-center gap-3">
            ⏰ <span className="text-[#EC6628]">Hours:</span> {restaurant?.workingHours || 'N/A'}
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-5xl font-extrabold mb-12 text-[#EC6628] border-b-4 border-[#EC6628] pb-2">
          Menu
        </h2>
        {restaurant.menu?.map((menuCategory, idx) => (
          <div key={idx} className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-[#EC6628]">{menuCategory.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {menuCategory?.menuItem?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="relative flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105 border border-[#FFD1A4] group"
                >
                  {item?.productImage?.url && (
                    <div className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={item.productImage.url}
                        alt={item.name || "Menu item"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col justify-between relative">
                    <Plus
                      onClick={() => handleAddToCart(item)}
                      className="absolute top-4 right-4 p-3 rounded-full shadow-lg bg-[#EC6628] text-white hover:bg-[#FF8C42] cursor-pointer transition-all duration-300 animate-pulse"
                    />
                    <h4 className="text-2xl font-bold mb-2">{item.name}</h4>
                    {item.description && <p className="text-gray-600 mb-2">{item.description}</p>}
                    {item.praice && <span className="text-[#EC6628] font-bold text-xl">${item.praice}</span>}
                  </div>

                  {/* Glow border effect */}
                  <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-[#EC6628] transition-all duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ReviewSection restaurant={restaurant} />
    </div>
  );
}

export default RestaurantsDetails;

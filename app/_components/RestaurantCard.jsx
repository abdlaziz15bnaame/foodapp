import Image from "next/image";
import Link from "next/link";
import React from "react";

function RestaurantCard({ res }) {
  return (
    <Link
      href={`/restaurants/${res?.slug}`}
      className="group block rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 ease-out border border-gray-100 cursor-pointer"
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={res?.banner?.url}
          alt={res?.name || "Restaurant banner"}
          width={450}
          height={280}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-orange-600 font-semibold px-3 py-1 rounded-full text-xs shadow-md">
            {res?.category?.[0]?.name || "Restaurant"}
          </span>
        </div>

        {/* Favorite Icon */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>

        {/* Overlay Text (Name) */}
        <div className="absolute bottom-0 left-0 w-full px-5 py-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
          <h2 className="text-xl font-semibold">{res?.name}</h2>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5">
        {/* Rating and Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Image src="/star.png" alt="star" width={18} height={18} />
            <span className="text-sm font-semibold text-gray-700">4.5</span>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {res?.restuarantType?.[0] || "Casual Dining"}
          </span>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>25–30 min</span>
          </div>

          <div className="flex items-center gap-1 text-orange-600 font-semibold">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
              />
            </svg>
            <span>Free delivery</span>
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-5 ">
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 ">
            Order Now 🍽️
          </button>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;


"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    setSelectedCategory(params.get('category') || 'All');
  }, [params]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategories(resp.categories);
      setLoaded(true);
    });
  };

  return (
    <div className="py-6 px-4 bg-gradient-to-r from-[#FFF0E5] to-[#FFE0C2] rounded-3xl shadow-lg mb-20 "> 
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={cat.id}>
            <Link
              href={"?category=" + cat?.name}
              className={`
                group relative flex flex-col items-center justify-center w-44 p-5 rounded-3xl
                border border-transparent bg-gradient-to-br from-white/20 to-white/10 
                backdrop-blur-xl shadow-xl hover:shadow-2xl transition-transform duration-700
                cursor-pointer transform perspective-1000
                overflow-hidden
                ${selectedCategory === cat?.name ? 'border-[#EC6628] scale-105 shadow-2xl bg-gradient-to-br from-orange-50/80 to-yellow-50/80' : ''}
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Glow ديناميكي متعدد الألوان */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#EC6628]/50 via-[#FFAA50]/40 to-[#FFDD88]/30 opacity-0 group-hover:opacity-80 blur-2xl animate-pulse-slow transition-opacity duration-500"></div>

              {/* انفجارات ضوء متحركة عند hover */}
              <div className="absolute -inset-2 bg-gradient-radial from-[#FFCC88]/0 via-[#EC6628]/20 to-[#FFD580]/0 opacity-0 group-hover:opacity-70 animate-spin-slow rounded-3xl"></div>

              {/* أيقونة التصنيف */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-orange-50 to-yellow-50 flex items-center justify-center shadow-inner mb-3 group-hover:shadow-xl transition-all duration-700 transform group-hover:scale-115 group-hover:rotate-[15deg]">
                <Image
                  width={48}
                  height={48}
                  src={cat?.icon?.url}
                  alt={cat?.name || "category"}
                  className="transition-transform duration-700 group-hover:rotate-[25deg] group-hover:translate-y-1"
                />
              </div>

              {/* اسم التصنيف */}
              <h2 className="text-sm font-bold text-gray-800 group-hover:text-[#EC6628] transition-colors duration-700 text-center">
                {cat.name}
              </h2>

              {/* شريط متحرك */}
              <div className={`mt-2 h-1 rounded-full bg-[#EC6628] transition-all duration-700 group-hover:w-12 ${selectedCategory === cat?.name ? 'w-12' : 'w-0'}`}></div>

              {/* تأثير 3D عند hover */}
              <style jsx>{`
                a:hover {
                  transform: rotateY(12deg) rotateX(8deg) scale(1.1);
                }
                @keyframes pulse-slow {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 1; }
                }
                .animate-pulse-slow {
                  animation: pulse-slow 3s infinite;
                }
                @keyframes spin-slow {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                  animation: spin-slow 10s linear infinite;
                }
              `}</style>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoryList;

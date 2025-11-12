"use client";
import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Search, ShoppingCart, Menu } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { UpdateCartContext } from './_context/UpdateCartContext'
import GlobalApi from '../_utils/GlobalApi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CartInfo from './CartInfo'
import Link from 'next/link'

function Header() {
  const { user } = useUser();
  const { cartItems, setCartItems } = useContext(UpdateCartContext);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    user && getUserCart();
  }, [user && cartItems]);

  const getUserCart = () => {
    GlobalApi.getUserCart(user.primaryEmailAddress.emailAddress).then((resp) => {
      setCart(resp?.shoppingCarts);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 shadow-lg border-b border-[#ec6628]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        
        {/* ✅ Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-[#EC6628]/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-[#EC6628]" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#EC6628] tracking-tight">
              Food<span className="text-gray-800">Hub</span>
            </h1>
          </Link>
        </div>

        {/* 🔍 Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-white/70 border border-[#EC6628]/30 rounded-full px-4 py-2 shadow-inner hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-[#EC6628] flex-1 max-w-lg mx-4">
          <Search className="text-[#EC6628] mr-2 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for meals or restaurants..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
          />
        </div>

        {/* 🧑‍💻 Right side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* 🔐 Auth buttons - Desktop */}
          {!user && (
            <div className="hidden sm:flex gap-2">
              <SignInButton mode='modal'>
                <Button className="bg-[#EC6628] hover:bg-[#e2571d] text-white font-semibold rounded-full shadow-md transition-all duration-300 text-sm px-3 py-2">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button className="border border-[#EC6628] text-[#EC6628] hover:bg-[#EC6628] hover:text-white font-semibold rounded-full transition-all duration-300 text-sm px-3 py-2">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}

          {/* 🔐 Auth buttons - Mobile */}
          {!user && (
            <div className="sm:hidden flex gap-1">
              <SignInButton mode='modal'>
                <Button className="bg-[#EC6628] hover:bg-[#e2571d] text-white font-semibold rounded-full shadow-md transition-all duration-300 text-xs px-2 py-1">
                  Login
                </Button>
              </SignInButton>
            </div>
          )}

          {/* 🛒 Cart */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer group">
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EC6628] text-white rounded-full px-1 text-[8px] sm:text-[10px] font-bold animate-pulse min-w-[16px] h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
                <div className="p-1 sm:p-2 rounded-full bg-white/70 hover:bg-[#EC6628]/10 transition-all duration-300">
                  <ShoppingCart className="text-[#EC6628] h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white/90 backdrop-blur-md shadow-lg border border-[#EC6628]/20 rounded-2xl w-72 sm:w-80 p-4">
              <CartInfo cart={cart} />
            </PopoverContent>
          </Popover>

          {/* 👤 User Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="scale-75 sm:scale-100">
                  <UserButton />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/90 backdrop-blur-md shadow-lg border border-[#EC6628]/20 rounded-xl p-2">
                <DropdownMenuLabel className="text-[#EC6628] font-semibold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/user">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/orders">
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* 📱 Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-white/70 border border-[#EC6628]/30 rounded-full px-4 py-2 shadow-inner hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-[#EC6628]">
          <Search className="text-[#EC6628] mr-2 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for meals or restaurants..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-[#ec6628]/20 px-4 py-3">
          <nav className="flex flex-col space-y-3">
            {!user && (
              <div className="flex flex-col gap-2 pt-2">
                <SignInButton mode='modal'>
                  <Button className="bg-[#EC6628] hover:bg-[#e2571d] text-white font-semibold rounded-full shadow-md transition-all duration-300 w-full">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode='modal'>
                  <Button className="border border-[#EC6628] text-[#EC6628] hover:bg-[#EC6628] hover:text-white font-semibold rounded-full transition-all duration-300 w-full">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
            {user && (
              <>
                <Link 
                  href="/user" 
                  className="text-gray-700 hover:text-[#EC6628] font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/orders" 
                  className="text-gray-700 hover:text-[#EC6628] font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
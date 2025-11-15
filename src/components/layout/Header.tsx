/**
 * Header Component
 * Barra de navegación superior completamente responsive
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cartStoreView } from "@/storeViews/cartStoreView"
import { featureFlagsStoreView } from "@/storeViews/featureFlagsStoreView"
import { useTagInteraction } from "@/hooks/useTagInteraction"
import { ROUTES } from "@/config/constants"
import type { Cart } from "@/types"

interface HeaderProps {
  onCartClick?: () => void
}

export function Header({ onCartClick }: HeaderProps) {
  const [cart, setCart] = useState<Cart>(() => cartStoreView.getState())
  const [cartUseDrawer, setCartUseDrawer] = useState(() => featureFlagsStoreView.getCartUseDrawer())
  const [isClient, setIsClient] = useState(false)
  const { trackViewCart } = useTagInteraction()

  useEffect(() => {
    setIsClient(true)

    // Suscribirse al cartStore
    const unsubscribeCart = cartStoreView.subscribe((updatedCart) => {
      setCart(updatedCart)
    })

    // Suscribirse a las feature flags
    const unsubscribeFlags = featureFlagsStoreView.subscribe((state) => {
      setCartUseDrawer(state.cart?.useDrawer ?? false)
    })

    return () => {
      unsubscribeCart()
      unsubscribeFlags()
    }
  }, [])

  const handleCartClick = (e: React.MouseEvent) => {
    // Track cuando el usuario hace clic en el carrito
    trackViewCart(cart.total, cart.itemCount)

    if (cartUseDrawer && onCartClick) {
      e.preventDefault()
      onCartClick()
    }
  }

  return (
    <header
      role='banner'
      className='sticky top-0 z-50 w-full bg-[#EEEEEE] !px-[20px] shadow-sm flex justify-center'
    >
      <div className='max-w-container w-full flex justify-center px-11'>
        <nav
          role='navigation'
          aria-label='Main navigation'
          className='flex items-center justify-between w-full h-16 min-h-[64px] py-5 px-2'
        >
          <h1>
            <Link
              href={ROUTES.HOME}
              className='font-bold text-[24px] leading-[24px] tracking-[0.4px] text-primary text-center'
              aria-label='GamerShop - Go to home page'
            >
              GamerShop
            </Link>
          </h1>

          <Link
            href={ROUTES.CART}
            onClick={handleCartClick}
            className='relative flex items-center gap-2 rounded-lg px-3 py-2 text-secondary hover:bg-surface transition-colors'
            aria-label={`Shopping cart${
              isClient && cart.itemCount > 0
                ? ` with ${cart.itemCount} ${
                    cart.itemCount === 1 ? "item" : "items"
                  }`
                : ", empty"
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 sm:h-7 sm:w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1}
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            {isClient && cart.itemCount > 0 && (
              <span
                className='absolute -top-1 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-red-500'
                aria-hidden='true'
              >
                {cart.itemCount > 9 ? "9+" : cart.itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

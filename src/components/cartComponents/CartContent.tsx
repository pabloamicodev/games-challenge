/**
 * CartContent Component
 * Contenido completo del carrito (usado tanto en página como en drawer)
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cartStoreView } from "@/storeViews/cartStoreView"
import { useCartOperator } from "@/hooks/useOperator"
import { useTagInteraction } from "@/hooks/useTagInteraction"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"
import { Button } from "../uiComponents/Button"
import { ROUTES } from "@/config/constants"
import type { Cart } from "@/types"

interface CartContentProps {
  showBackButton?: boolean
  showCheckout?: boolean
}

export function CartContent({
  showBackButton = true,
  showCheckout = true,
}: CartContentProps) {
  const [cart, setCart] = useState<Cart>(() => cartStoreView.getState())
  const [isClient, setIsClient] = useState(false)
  const { trackViewCart } = useTagInteraction()
  const { removeItem } = useCartOperator()

  useEffect(() => {
    setIsClient(true)

    // Suscribirse al cartStore
    const unsubscribe = cartStoreView.subscribe((updatedCart) => {
      setCart(updatedCart)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Track view_cart cuando se monta el componente
  useEffect(() => {
    if (isClient && cart.items.length > 0) {
      trackViewCart(cart.total, cart.itemCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  if (!isClient) {
    return (
      <div className='flex items-center justify-center p-8'>
        <p className='text-text-secondary'>Loading cart...</p>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 sm:h-20 sm:w-20 text-text-secondary mb-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
          />
        </svg>
        <h2 className='text-xl sm:text-2xl font-bold text-text-primary mb-2'>
          Your Cart is Empty
        </h2>
        <p className='text-sm sm:text-base text-text-secondary mb-6'>
          Start adding some games to your cart!
        </p>
        {showBackButton && (
          <Link href={ROUTES.HOME}>
            <Button variant='primary' size='lg'>
              Browse Games
            </Button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full w-full'>
      {showBackButton && (
        <div className='h-[72px] flex items-center px-6'>
          <Link
            href={ROUTES.HOME}
            className='inline-flex items-center gap-2 text-sm sm:text-base text-text-dark hover:text-text-dark/80 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 sm:h-5 sm:w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Back to Catalog
          </Link>
        </div>
      )}

      <div className='flex-grow flex flex-col gap-12 py-12!+'>
        <div className='flex flex-col gap-3 px-6 py-6'>
          <h2 className='font-bold text-[36px] leading-[40px] tracking-[0.4px] text-text-dark'>
            Your Cart
          </h2>
          <p className='text-sm sm:text-base text-text-dark'>
            {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        <div className='flex flex-wrap justify-center sm:justify-between gap-20 !pb-[48px]'>
          <div className='flex-grow justify-center overflow-y-auto p-6 max-w-[327px] sm:max-w-[678px]' >
            <div className='space-y-4'>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
          </div>

          <div className=' p-4 sm:p-6 bg-white min-w-[360px] '>
            <CartSummary cart={cart} showCheckout={showCheckout} />
          </div>
        </div>
      </div>
    </div>
  )
}

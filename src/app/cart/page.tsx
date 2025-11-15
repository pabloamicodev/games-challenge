/**
 * Cart Page
 * Página dedicada del carrito
 */

import { Metadata } from "next"
import { CartContent } from "@/components/cartComponents/CartContent"

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected games and proceed to checkout. Manage your cart items before completing your purchase.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function CartPage() {
  return (
    <main
      id='main-content'
      role='main'
      aria-labelledby='cart-title'
      className='w-full flex justify-center '
    >
      <h1 id='cart-title' className='sr-only'>
        Shopping Cart
      </h1>
      <div className='max-w-container flex justify-center py-6 sm:py-8 lg:py-12 w-full'>
        <div className='bg-white rounded-lg w-full  overflow-hidden max-w-container mx-auto'>
          <CartContent showBackButton showCheckout />
        </div>
      </div>
    </main>
  )
}

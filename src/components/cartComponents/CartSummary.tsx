/**
 * CartSummary Component
 * Resumen del carrito con totales
 */

"use client"

import { Button } from "../uiComponents/Button"
import { useTagInteraction } from "@/hooks/useTagInteraction"
import type { Cart } from "@/types"

interface CartSummaryProps {
  cart: Cart
  showCheckout?: boolean
  onCheckout?: () => void
}

export function CartSummary({
  cart,
  showCheckout = false,
  onCheckout,
}: CartSummaryProps) {
  const { trackBeginCheckout } = useTagInteraction();

  const handleCheckout = () => {
    // Track el inicio del checkout
    trackBeginCheckout(
      cart.total,
      cart.itemCount,
      cart.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.genre,
        quantity: item.quantity,
      }))
    );

    // Llamar al callback si existe
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <>
      <div className='rounded-lg bg-surface py-6! px-8! border border-[#EEEEEE]'>
        <h3 className='text-lg sm:text-xl font-bold text-text-primary mb-4 pb-3!'>
          Order Summary
        </h3>
        <div className='flex justify-between text-sm sm:text-base'>
          <span className='text-text-secondary'>
            {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className='space-y-3 pt-8! flex flex-col gap-3'>
          {cart.items.map((item) => (
            <div
              key={item.id}
              className='flex justify-between text-sm sm:text-base'
            >
              <span className='text-text-secondary '>{item.name}</span>
              <span className='text-text-primary font-medium'>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className='border-t border-border pt-3 mt-3'>
            <div className='flex justify-between text-base sm:text-lg font-bold pt-4!'>
              <span className='text-text-primary'>Order Total</span>
              <span className='text-primary'>${cart.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {showCheckout && (
        <div className='pt-8!'>
          <Button
            variant='secondary'
            size='lg'
            className='h-14 bg-neutral-700! text-white rounded-lg'
            fullWidth
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      )}
    </>
  )
}

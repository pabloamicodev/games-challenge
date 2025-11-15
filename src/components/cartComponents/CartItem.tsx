/**
 * CartItem Component
 * Item individual del carrito con capacidad de eliminar
 */

"use client"

import Image from "next/image"
import { useTagInteraction } from "@/hooks/useTagInteraction"
import type { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
  onRemove: (id: string) => Promise<void>
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const { trackRemoveFromCart } = useTagInteraction();

  const handleRemove = async () => {
    // Ejecutar acción y tracking
    await onRemove(item.id);
    trackRemoveFromCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.genre,
      quantity: item.quantity,
    });
  };

  return (
    <article
      className='relative flex flex-col sm:flex-row gap-3 sm:gap-4 border-b border-[#EEEEEE] pb-4 last:border-0 p-5! sm:pl-0! max-w-[327px] sm:max-w-none'
      aria-label={`${item.name} in cart`}
    >
      <div className='relative w-full! max-w-64 h-[156px] sm:w-24 flex-shrink-0  overflow-hidden bg-surface'>
        {item.isNew && (
          <span
            className='absolute top-1 left-1 z-10  bg-new-badge px-1.5 py-0.5 text-[10px] font-bold text-white uppercase'
            aria-label='New release'
          >
            New
          </span>
        )}
        <Image
          src={item.image}
          alt={`${item.name} cover art`}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
      </div>
      <button
        onClick={handleRemove}
        className='sm:hidden sm:flex-shrink-0 self-start rounded p-1 text-text-secondary hover:bg-error absolute top-5 right-4'
        aria-label={`Remove ${item.name} from cart`}
        type='button'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

    <div className='flex flex-col flex-grow min-w-0 gap-3'>

        <p className='text-xs text-text-secondary uppercase mb-1'>
          {item.genre}
        </p>


        <h3 className='text-sm sm:text-base font-semibold text-text-primary mb-1 line-clamp-1'>
          {item.name}
        </h3>


        <p className='text-xs sm:text-sm text-text-secondary mb-2 line-clamp-2'>
          {item.description}
        </p>


        <div className='flex items-center justify-end gap-2'>
          <p className='text-base sm:text-lg font-bold text-text-primary'>
            ${item.price}
          </p>
          {item.quantity > 1 && (
            <span
              className='text-xs text-text-secondary'
              aria-label={`Quantity: ${item.quantity}`}
            >
              × {item.quantity}
            </span>
          )}
        </div>
      </div>


      <button
        onClick={handleRemove}
        className='hidden sm:flex-shrink-0 self-start rounded p-1 text-text-secondary hover:bg-error'
        aria-label={`Remove ${item.name} from cart`}
        type='button'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </article>
  )
}

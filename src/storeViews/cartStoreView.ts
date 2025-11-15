/**
 * layer 2: STORE VIEWS - Cart Store View
 */

'use client';

import { 
  getCartState, 
  subscribeToCart,
  isItemInCart,
  getItemQuantity as getItemQty,
  getCartTotal,
  getCartItemCount
} from '@/store/cartStore';
import type { Cart } from '@/types';


export const cartStoreView = {

  getState(): Cart {
    return getCartState();
  },

  subscribe(subscriber: (cart: Cart) => void): () => void {
    return subscribeToCart(subscriber);
  },

  isInCart(gameId: string): boolean {
    return isItemInCart(gameId);
  },

  getItemQuantity(gameId: string): number {
    return getItemQty(gameId);
  },

  getTotal(): number {
    return getCartTotal();
  },

  getItemCount(): number {
    return getCartItemCount();
  }
};

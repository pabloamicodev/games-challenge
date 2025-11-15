/**
 * LAYER 3: OPERATRS - Cart Operator
 * 
  * This operator handles business logic and store updates related to the shopping cart. singleton pattern.
 */

import type { Game } from '@/types';
import * as cartAbstractor from '@/abstractor/cartAbstractor';
import * as cartStore from '@/store/cartStore';

class CartOperator {
  private static instance: CartOperator;

  private constructor() {}

  static getInstance(): CartOperator {
    if (!CartOperator.instance) {
      CartOperator.instance = new CartOperator();
    }
    return CartOperator.instance;
  }


  async initializeCart(): Promise<void> {
    try {
      const cart = await cartAbstractor.fetchCart();
      cartStore.setCart(cart);
    } catch (error) {
      console.error('Error initializing cart:', error);
      throw error;
    }
  }


  async refreshCart(): Promise<void> {
    try {
      const cart = await cartAbstractor.fetchCart();
      cartStore.setCart(cart);
    } catch (error) {
      console.error('Error refreshing cart:', error);
      throw error;
    }
  }


  async addItem(game: Game): Promise<void> {
    try {
      const updatedCart = await cartAbstractor.addItem(game);
      cartStore.setCart(updatedCart);
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  }


  async removeItem(gameId: string): Promise<void> {
    try {
      const updatedCart = await cartAbstractor.removeItem(gameId);
      cartStore.setCart(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }


  async updateQuantity(gameId: string, quantity: number): Promise<void> {
    try {
      const updatedCart = await cartAbstractor.updateQuantity(gameId, quantity);
      cartStore.setCart(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  }


  async clearCart(): Promise<void> {
    try {
      const updatedCart = await cartAbstractor.clearCart();
      cartStore.setCart(updatedCart);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

export const cartOperator = CartOperator.getInstance();

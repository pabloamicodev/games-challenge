/**
 * CART STORE - Reducer/State Management
 */

'use client';

import type { Cart, CartItem } from '@/types';

type Subscriber = (cart: Cart) => void;


export const initialCartState: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};


let state: Cart = { ...initialCartState };
const subscribers = new Set<Subscriber>();


function recalculateTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    total: Math.round(total * 100) / 100,
    itemCount,
  };
}


function notifySubscribers(): void {
  subscribers.forEach((subscriber) => subscriber(state));
}

/**
 * ACTIONS
 */


export function setCart(cart: Cart): void {
  state = { ...cart };
  notifySubscribers();
}

export function addItemToCart(item: CartItem): void {
  const existingIndex = state.items.findIndex((i) => i.id === item.id);

  let updatedItems: CartItem[];
  if (existingIndex >= 0) {
    updatedItems = [...state.items];
    updatedItems[existingIndex] = {
      ...updatedItems[existingIndex],
      quantity: updatedItems[existingIndex].quantity + 1,
    };
  } else {
    updatedItems = [...state.items, { ...item, quantity: 1 }];
  }

  const { total, itemCount } = recalculateTotals(updatedItems);
  state = { items: updatedItems, total, itemCount };
  notifySubscribers();
}


export function removeItemFromCart(gameId: string): void {
  const updatedItems = state.items.filter((item) => item.id !== gameId);
  const { total, itemCount } = recalculateTotals(updatedItems);
  
  state = { items: updatedItems, total, itemCount };
  notifySubscribers();
}


export function updateItemQuantity(gameId: string, quantity: number): void {
  if (quantity <= 0) {
    removeItemFromCart(gameId);
    return;
  }

  const updatedItems = state.items.map((item) =>
    item.id === gameId ? { ...item, quantity } : item
  );

  const { total, itemCount } = recalculateTotals(updatedItems);
  state = { items: updatedItems, total, itemCount };
  notifySubscribers();
}

export function clearCart(): void {
  state = { ...initialCartState };
  notifySubscribers();
}

/**
 * SELECTORS
 */


export function getCartState(): Cart {
  return { ...state };
}

export function isItemInCart(gameId: string): boolean {
  return state.items.some((item) => item.id === gameId);
}


export function getItemQuantity(gameId: string): number {
  const item = state.items.find((item) => item.id === gameId);
  return item?.quantity || 0;
}

export function getCartTotal(): number {
  return state.total;
}


export function getCartItemCount(): number {
  return state.itemCount;
}

/**
 * SUBSCRIPTION
 */

export function subscribeToCart(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);
  
  return () => {
    subscribers.delete(subscriber);
  };
}


export function resetCartState(): void {
  state = { ...initialCartState };
  notifySubscribers();
}

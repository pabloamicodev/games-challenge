/**
 * LAYER 4: ABSTRACTOR - Cart Abstractor
 * 
 * This layer is responsible for:
 * 1. Communicating with the "backend" (localStorage in this simulated case)
 * 2. Parsing and validating responses
 * 3. Mapping external data to our internal structure
 * 
 * In production: This layer would communicate with a real REST API
 * In development: Simulates the API using localStorage
 * 
 * Benefits:
 * - Decoupling: If we switch from localStorage to a real API, we only modify this layer
 * - Validation: We ensure data is consistent
 * - Type safety: We map to well-defined internal types
 * - Homogeneity: Predictable data structure throughout the app
 */

import type { Cart, CartItem, Game } from '@/types';
import { STORAGE_KEYS } from '@/config/constants';

/**
 * External API Response types
 * These types represent what a real API would return
 */
interface ExternalCartItem {
  id: string;
  name: string;
  genre: string;
  image: string;
  description: string;
  price: number;
  isNew: boolean;
  quantity: number;
}

interface ExternalCartResponse {
  items: ExternalCartItem[];
  total: number;
  itemCount: number;
  lastModified?: string;
  userId?: string; 
}

/**
 * Parser to validate and transform cart item data
 */
function parseCartItem(data: ExternalCartItem): CartItem | null {
  try {

    // Additional validations
    if (data.quantity <= 0) {
      console.warn('Invalid quantity for cart item:', data);
      return null;
    }

    return {
      id: data.id,
      name: data.name.trim(),
      genre: data.genre.trim(),
      image: data.image,
      description: data.description.trim(),
      price: Math.max(0, data.price),
      isNew: data.isNew,
      quantity: Math.max(1, Math.floor(data.quantity)),
    };
  } catch (error) {
    console.error('Error parsing cart item:', error);
    return null;
  }
}

/**
 * Parser for complete cart response
 */
function parseCartResponse(data: ExternalCartResponse): Cart {
  try {
    // Parse and filter invalid items
    const items = Array.isArray(data.items)
      ? data.items
          .map(parseCartItem)
          .filter((item): item is CartItem => item !== null)
      : [];

    // Recalculate total and itemCount to ensure consistency
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      total: Math.round(total * 100) / 100,
      itemCount,
    };
  } catch (error) {
    console.error('Error parsing cart response:', error);
    return {
      items: [],
      total: 0,
      itemCount: 0,
    };
  }
}

/**
 * Helper functions
 */

async function simulateNetworkDelay(): Promise<void> {
  // Simulate network latency (development only)
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function saveCart(cart: Cart): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const externalFormat: ExternalCartResponse = {
      items: cart.items,
      total: cart.total,
      itemCount: cart.itemCount,
      lastModified: new Date().toISOString(),
    };

    localStorage.setItem(
      STORAGE_KEYS.CART,
      JSON.stringify(externalFormat)
    );
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
}

function calculateCartTotals(items: CartItem[]): Cart {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    total: Math.round(total * 100) / 100,
    itemCount,
  };
}

function getEmptyCart(): Cart {
  return {
    items: [],
    total: 0,
    itemCount: 0,
  };
}

/**
 * Public API functions
 * In production, these would make fetch() calls to real endpoints
 */

/**
 * Simulates: GET /api/cart
 * Fetches the user's current cart
 */
export async function fetchCart(): Promise<Cart> {
  try {
    // In production: const response = await fetch('/api/cart');
    await simulateNetworkDelay();

    if (typeof window === 'undefined') {
      return getEmptyCart();
    }

    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    
    if (!stored) {
      return getEmptyCart();
    }

    const externalData: ExternalCartResponse = JSON.parse(stored);
    return parseCartResponse(externalData);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return getEmptyCart();
  }
}

/**
 * Simulates: POST /api/cart/items
 * Adds an item to the cart
 */
export async function addItem(game: Game): Promise<Cart> {
  try {
    await simulateNetworkDelay();

    const currentCart = await fetchCart();
    const existingIndex = currentCart.items.findIndex(
      (item) => item.id === game.id
    );

    let updatedItems: CartItem[];

    if (existingIndex >= 0) {
      // Increase quantity if item already exists
      updatedItems = [...currentCart.items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1,
      };
    } else {
      // Add new item
      updatedItems = [
        ...currentCart.items,
        {
          ...game,
          quantity: 1,
        },
      ];
    }

    const updatedCart = calculateCartTotals(updatedItems);
    await saveCart(updatedCart);
    
    return updatedCart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

/**
 * Simulates: DELETE /api/cart/items/:id
 * Removes an item from the cart
 */
export async function removeItem(gameId: string): Promise<Cart> {
  try {
    await simulateNetworkDelay();

    const currentCart = await fetchCart();
    const updatedItems = currentCart.items.filter(
      (item) => item.id !== gameId
    );

    const updatedCart = calculateCartTotals(updatedItems);
    await saveCart(updatedCart);
    
    return updatedCart;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

/**
 * Simulates: PUT /api/cart/items/:id
 * Updates an item's quantity
 */
export async function updateQuantity(gameId: string, quantity: number): Promise<Cart> {
  try {
    await simulateNetworkDelay();

    if (quantity <= 0) {
      return removeItem(gameId);
    }

    const currentCart = await fetchCart();
    const updatedItems = currentCart.items.map((item) =>
      item.id === gameId ? { ...item, quantity } : item
    );

    const updatedCart = calculateCartTotals(updatedItems);
    await saveCart(updatedCart);
    
    return updatedCart;
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw error;
  }
}

/**
 * Simulates: DELETE /api/cart
 * Completely empties the cart
 */
export async function clearCart(): Promise<Cart> {
  try {
    await simulateNetworkDelay();

    const emptyCart = getEmptyCart();
    await saveCart(emptyCart);
    
    return emptyCart;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

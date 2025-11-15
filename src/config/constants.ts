/**
 * Application Constants
 * Centralized configuration to avoid hardcoded values
 * 
 * Note: Colors, spacing, and design tokens are defined in tailwind.config.ts
 * This file contains only business logic constants
 */

export const API_CONFIG = {
  BASE_URL: '',  // Will be set at runtime or use relative URLs
  ENDPOINTS: {
    GAMES: '/api/games',
  },
  ITEMS_PER_PAGE: 12,
} as const;

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  CATALOG: '/',
} as const;

export const STORAGE_KEYS = {
  CART: 'gamer-shop-cart',
  CACHE_PREFIX: 'gamer-shop-cache-',
} as const;


'use client';

import { useCallback } from 'react';
import { cartOperator } from '@/operators/cartOperator';
import { gameOperator } from '@/operators/gameOperator';
import { useToastContext } from './useToastContext';
import type { Game, GameFilter } from '@/types';

export function useCartOperator() {
  const toast = useToastContext();

  const initializeCart = useCallback(async () => {
    await cartOperator.initializeCart();
  }, []);

  const addItem = useCallback(async (game: Game) => {
    try {
      await cartOperator.addItem(game);
      toast.success(`${game.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart');
      throw error;
    }
  }, [toast]);

  const removeItem = useCallback(async (gameId: string) => {
    try {
      await cartOperator.removeItem(gameId);
    } catch (error) {
      toast.error('Failed to remove item from cart');
      throw error;
    }
  }, [toast]);

  const updateQuantity = useCallback(async (gameId: string, quantity: number) => {
    try {
      await cartOperator.updateQuantity(gameId, quantity);
      toast.success('Quantity updated');
    } catch (error) {
      toast.error('Failed to update quantity');
      throw error;
    }
  }, [toast]);

  const clearCart = useCallback(async () => {
    try {
      await cartOperator.clearCart();
      toast.info('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
      throw error;
    }
  }, [toast]);

  return {
    initializeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}

/**
 * Hook to access Game Operator methods
 */
export function useGameOperator() {
  const loadGames = useCallback(async (filters?: GameFilter) => {
    await gameOperator.loadGames(filters);
  }, []);

  const loadAvailableGenres = useCallback(async () => {
    await gameOperator.loadAvailableGenres();
  }, []);

  return {
    loadGames,
    loadAvailableGenres,
  };
}


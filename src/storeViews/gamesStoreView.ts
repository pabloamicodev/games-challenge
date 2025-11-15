/**
 * layer 2: STORE VIEWS - Games Store View
 */

'use client';

import { 
  getGamesState, 
  subscribeToGames,
  type GamesState 
} from '@/store/gamesStore';
import type { Game } from '@/types';


export const gamesStoreView = {

  getState(): GamesState {
    return getGamesState();
  },


  subscribe(subscriber: (state: GamesState) => void): () => void {
    return subscribeToGames(subscriber);
  },

  getGames(): Game[] {
    return getGamesState().games;
  },

  getAvailableFilters(): string[] {
    return getGamesState().availableFilters;
  },

  isLoading(): boolean {
    return getGamesState().isLoading;
  },

  getCurrentPage(): number {
    return getGamesState().currentPage;
  },

  getTotalPages(): number {
    return getGamesState().totalPages;
  },

  getCurrentFilter(): string | undefined {
    return getGamesState().currentFilter;
  }
};

/**
 * LAYER 3: OPERATORS - Game Operator
 * 
 * This operator handles business logic and store updates related to games. with a singleton pattern.

 */

import * as gameAbstractor from '@/abstractor/gameAbstractor';
import * as gamesStore from '@/store/gamesStore';
import type { GameFilter } from '@/types';

class GameOperator {
  private static instance: GameOperator;

  private constructor() {}

  static getInstance(): GameOperator {
    if (!GameOperator.instance) {
      GameOperator.instance = new GameOperator();
    }
    return GameOperator.instance;
  }


  async loadGames(filters?: GameFilter): Promise<void> {
    try {
      gamesStore.setGamesLoading(true);


      const response = await gameAbstractor.fetchGames(filters);

      gamesStore.updateGamesState({
        games: response.games,
        availableFilters: response.availableFilters,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        currentFilter: filters?.genre,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading games:', error);
      gamesStore.setGamesLoading(false);
      throw error;
    }
  }

  async loadAvailableGenres(): Promise<void> {
    try {
      const response = await gameAbstractor.fetchGames();
      gamesStore.setAvailableFilters(response.availableFilters);
    } catch (error) {
      console.error('Error loading genres:', error);
      throw error;
    }
  }
}

export const gameOperator = GameOperator.getInstance();

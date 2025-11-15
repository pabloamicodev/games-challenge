/**
 * LAYER 4: ABSTRACTOR
 * 
 * This layer is responsible for:
 * 1. Communicating with external API
 * 2. Parsing and validating responses
 * 3. Mapping external data to our internal structure
 * 
 * Benefits:
 * - Decoupling: If the API changes, we only modify this layer
 * - Validation: We ensure data is consistent
 * - Type safety: We map to well-defined internal types
 * - Homogeneity: Predictable data structure throughout the app
 */

import type { Game, GamesApiResponse } from '@/types';
import { API_CONFIG } from '@/config/constants';

/**
 * API Response types (external structure)
 * These types represent what the API returns to us
 */
interface ExternalGameResponse {
  id: unknown;
  genre: unknown;
  image: unknown;
  name: unknown;
  description: unknown;
  price: unknown;
  isNew: unknown;
}

interface ExternalGamesApiResponse {
  games: ExternalGameResponse[];
  availableFilters: unknown[];
  totalPages: unknown;
  currentPage: unknown;
}

/**
 * Parser to validate and transform game data
 * 
 * Why parse? Although in this case the API is reliable,
 * in production APIs can:
 * - Change their structure without notice
 * - Return unexpected null/undefined values
 * - Have type inconsistencies
 * 
 * The parser ensures we always work with valid data
 */
function parseGame(data: ExternalGameResponse): Game | null {
  try {
    // Robust validation and transformation
    if (
      typeof data.id !== 'string' ||
      typeof data.name !== 'string' ||
      typeof data.genre !== 'string' ||
      typeof data.image !== 'string' ||
      typeof data.description !== 'string' ||
      typeof data.price !== 'number' ||
      typeof data.isNew !== 'boolean'
    ) {
      console.warn('Invalid game data:', data);
      return null;
    }

    // Return homogeneous internal structure
    return {
      id: data.id,
      name: data.name.trim(),
      genre: data.genre.trim(),
      image: data.image,
      description: data.description.trim(),
      price: Math.max(0, data.price), // Ensure positive price
      isNew: data.isNew,
    };
  } catch (error) {
    console.error('Error parsing game:', error);
    return null;
  }
}

/**
 * Fetches games from API with optional filters
 */
export async function fetchGames(params?: {
  genre?: string;
  page?: number;
}): Promise<GamesApiResponse> {
  try {
    const url = new URL(API_CONFIG.ENDPOINTS.GAMES, 
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    );

    if (params?.genre) {
      url.searchParams.set('genre', params.genre);
    }
    if (params?.page) {
      url.searchParams.set('page', params.page.toString());
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store', // For SSR in Next.js
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ExternalGamesApiResponse = await response.json();

    // Parse and filter invalid data
    const parsedGames = data.games
      .map(parseGame)
      .filter((game): game is Game => game !== null);

    // Return consistent internal structure
    return {
      games: parsedGames,
      availableFilters: Array.isArray(data.availableFilters)
        ? data.availableFilters.filter(
            (f): f is string => typeof f === 'string'
          )
        : [],
      totalPages:
        typeof data.totalPages === 'number' ? data.totalPages : 1,
      currentPage:
        typeof data.currentPage === 'number' ? data.currentPage : 1,
    };
  } catch (error) {
    console.error('Error fetching games:', error);
    // In case of error, return empty but valid structure
    return {
      games: [],
      availableFilters: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

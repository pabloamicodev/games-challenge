import { allGames, availableFilters, delay } from "@/utils/endpoint"
import type { GamesApiResponse } from "@/types"

const ITEMS_PER_PAGE = 12

export interface GetGamesParams {
  genre?: string
  page?: number
}

/**
 * Shared service to fetch games data
 * Can be used directly in server components or via API route
 */
export async function getGames(params?: GetGamesParams): Promise<GamesApiResponse> {
  let games = allGames
  const genre = params?.genre
  let page = params?.page ?? 1

  if (genre) {
    games = games.filter((game) => game.genre.toLowerCase() === genre.toLowerCase())
  }

  if (page < 1 || isNaN(page)) page = 1

  // Mock a delay to simulate a real API
  await delay(2000)

  const fromIndex = (page - 1) * ITEMS_PER_PAGE
  const toIndex = page * ITEMS_PER_PAGE
  const paginatedGames = games.slice(fromIndex, toIndex)

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE)
  const currentPage = page

  return {
    games: paginatedGames,
    availableFilters,
    totalPages,
    currentPage,
  }
}

/**
 * LAYER 4: ABSTRACTOR
 */

import type { Game, GamesApiResponse } from "@/types"
import { API_CONFIG } from "@/config/constants"
import { getGames } from "@/services/gamesService"

interface ExternalGameResponse {
  id: unknown
  genre: unknown
  image: unknown
  name: unknown
  description: unknown
  price: unknown
  isNew: unknown
}

interface ExternalGamesApiResponse {
  games: ExternalGameResponse[]
  availableFilters: unknown[]
  totalPages: unknown
  currentPage: unknown
}

function parseGame(data: ExternalGameResponse): Game | null {
  try {
    if (
      typeof data.id !== "string" ||
      typeof data.name !== "string" ||
      typeof data.genre !== "string" ||
      typeof data.image !== "string" ||
      typeof data.description !== "string" ||
      typeof data.price !== "number" ||
      typeof data.isNew !== "boolean"
    ) {
      console.warn("Invalid game data:", data)
      return null
    }

    return {
      id: data.id,
      name: data.name.trim(),
      genre: data.genre.trim(),
      image: data.image,
      description: data.description.trim(),
      price: Math.max(0, data.price),
      isNew: data.isNew,
    }
  } catch (error) {
    console.error("Error parsing game:", error)
    return null
  }
}

export async function fetchGames(params?: {
  genre?: string
  page?: number
}): Promise<GamesApiResponse> {
  try {
    // Server-side: call service directly (no HTTP request needed)
    if (typeof window === "undefined") {
      console.log("[Server] Calling games service directly with params:", params)
      const result = await getGames(params)
      console.log("[Server] Service returned", result.games.length, "games")
      return result
    }

    // Client-side: use fetch to API route
    const url = new URL(API_CONFIG.ENDPOINTS.GAMES, window.location.origin)
    if (params?.genre) url.searchParams.set("genre", params.genre)
    if (params?.page) url.searchParams.set("page", params.page.toString())

    console.log("[Client] Fetching from:", url.toString())

    const response = await fetch(url.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    console.log("[Client] Response received:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Client] API Error:", response.status, response.statusText, errorText)
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const data: ExternalGamesApiResponse = await response.json()

    const parsedGames = data.games.map(parseGame).filter((game): game is Game => game !== null)

    const result = {
      games: parsedGames,
      availableFilters: Array.isArray(data.availableFilters)
        ? data.availableFilters.filter((f): f is string => typeof f === "string")
        : [],
      totalPages: typeof data.totalPages === "number" ? data.totalPages : 1,
      currentPage: typeof data.currentPage === "number" ? data.currentPage : 1,
    }

    console.log("[Client] Parsed", parsedGames.length, "games")

    return result
  } catch (error) {
    console.error("[Error] Failed to fetch games:", error)
    console.error("[Error] Error details:", error instanceof Error ? error.message : String(error))
    console.error("[Error] Stack:", error instanceof Error ? error.stack : "N/A")
    // Re-throw the error so we can see it in Vercel logs
    throw error
  }
}

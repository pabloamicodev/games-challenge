/**
 * CatalogView Component
 * Vista principal del catálogo con filtros, grilla y paginación
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GameCard } from "@/components/gameComponents/GameCard"
import { Loader } from "@/components/uiComponents/Loader"
import { Button } from "@/components/uiComponents/Button"
import { cartStoreView } from "@/storeViews/cartStoreView"
import { gamesStoreView } from "@/storeViews/gamesStoreView"
import { useCartOperator, useGameOperator } from "@/hooks/useOperator"
import { useTagInteraction } from "@/hooks/useTagInteraction"
import type { GamesApiResponse } from "@/types"

interface CatalogViewProps {
  initialData: GamesApiResponse
  initialGenre?: string
  initialPage: number
}

export function CatalogView({
  initialData,
  initialGenre,
  initialPage,
}: CatalogViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { trackViewItemList, trackSearch } = useTagInteraction()
  const { addItem, removeItem } = useCartOperator()
  const { loadGames } = useGameOperator()

  const [data, setData] = useState<GamesApiResponse>(initialData)
  const [selectedGenre, setSelectedGenre] = useState(initialGenre || "")
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Subscribe to games store to get updated data
  useEffect(() => {
    const unsubscribe = gamesStoreView.subscribe(() => {
      const gamesData = gamesStoreView.getState()
      setData({
        games: gamesData.games,
        availableFilters: gamesData.availableFilters,
        totalPages: gamesData.totalPages,
        currentPage: gamesData.currentPage,
      })
    })
    return unsubscribe
  }, [])

  // Función helper para verificar si está en carrito
  const isInCart = (gameId: string) => {
    return cartStoreView.isInCart(gameId)
  }


  // Track view_item_list cuando se carga el catálogo o cambia el género
  useEffect(() => {
    if (data.games.length > 0) {
      trackViewItemList(
        data.games.map(game => ({
          id: game.id,
          name: game.name,
          price: game.price,
          category: game.genre,
        })),
        selectedGenre ? `${selectedGenre} Games` : 'All Games'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.games.length, selectedGenre]);

  // Load more games
  const loadMore = async () => {
    const nextPage = currentPage + 1

    try {
      await loadGames({
        genre: selectedGenre || undefined,
        page: nextPage,
      })
      
      setCurrentPage(nextPage)

      // Track pagination event
      const games = gamesStoreView.getGames()
      trackViewItemList(
        games.slice(-10).map(game => ({
          id: game.id,
          name: game.name,
          price: game.price,
          category: game.genre,
        })),
        `${selectedGenre ? `${selectedGenre} Games` : 'All Games'} - Page ${nextPage}`
      );

      // Update URL
      const params = new URLSearchParams(searchParams)
      params.set("page", nextPage.toString())
      router.push(`?${params.toString()}`, { scroll: false })
    } catch (error) {
      console.error("Error loading more games:", error)
    }
  }

  // Change genre filter
  const handleGenreChange = async (genre: string) => {
    setSelectedGenre(genre)
    setCurrentPage(1)

    try {
      await loadGames({
        genre: genre || undefined,
        page: 1,
      })

      // Track search/filter event
      trackSearch(genre || 'All');

      // Update URL
      const params = new URLSearchParams()
      if (genre) {
        params.set("genre", genre)
      }
      params.set("page", "1")
      router.push(`?${params.toString()}`)
    } catch (error) {
      console.error("Error filtering games:", error)
    }
  }

  const hasMore = currentPage < data.totalPages
  const loading = gamesStoreView.isLoading()

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='max-w-container w-full flex flex-col justify-center py-6 sm:py-8 lg:py-12'>
        <header className='mb-6 sm:mb-8 h-[240px] flex flex-col justify-center align-center gap-12 border-b border-[#E5E7EB]'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4'>
            Top Sellers
          </h1>

          <div
            className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mr-auto'
            role='search'
            aria-label='Game catalog filters'
          >
            <div className='flex items-center gap-6 h-[56px]'>
              <label
                htmlFor='genre-filter'
                className='text-sm sm:text-base font-medium text-text-primary whitespace-nowrap'
              >
                Genre
              </label>
              <span
                className=' border w-px  mx-3 h-[22px]'
                aria-hidden='true'
              ></span>
              <select
                id='genre-filter'
                name='genre'
                value={selectedGenre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className='flex-1 sm:flex-initial sm:min-w-[200px] rounded-md border-none bg-white px-3 py-2 text-sm sm:text-base text-text-primary '
                disabled={loading}
                aria-label='Filter games by genre'
                aria-describedby='genre-description'
              >
                <option value=''>All</option>
                {data.availableFilters.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <span id='genre-description' className='sr-only'>
                Select a genre to filter the game catalog
              </span>
            </div>
          </div>
        </header>

        {loading && data.games.length === 0 ? (
          <Loader size='lg' text='Loading games...' />
        ) : (
          <div className='py-[48px]!'>
            <section
              className='flex flex-wrap justify-center gap-cards mb-8 mx-auto'
              aria-label='Game catalog'
              role='list'
            >
              {data.games.map((game) => (
                <div key={game.id} role='listitem'>
                  <GameCard
                    game={game}
                    isInCart={isInCart(game.id)}
                    onAddToCart={addItem}
                    onRemoveFromCart={removeItem}
                  />
                </div>
              ))}
            </section>

            {hasMore && (
              <div
                className='flex justify-start items-end h-[104px]'
                role='navigation'
                aria-label='Pagination'
              >
                <Button
                  variant='primary'
                  size='lg'
                  className='bg-neutral-700 text-white rounded-lg h-14 px-6 py-4 gap-2 md:w-[137px]'
                  onClick={loadMore}
                  isLoading={loading}
                  disabled={loading}
                  aria-label={`Load more games - Page ${currentPage + 1} of ${
                    data.totalPages
                  }`}
                >
                  {loading ? "Loading..." : "SEE MORE"}
                </Button>
              </div>
            )}

            <div role='status' aria-live='polite' className='sr-only'>
              {loading
                ? "Loading more games..."
                : `Showing ${data.games.length} games. ${
                    hasMore
                      ? `Page ${currentPage} of ${data.totalPages}`
                      : "All games loaded"
                  }`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { Metadata } from "next"
import * as gameAbstractor from "@/abstractor/gameAbstractor"
import { CatalogView } from "@/components/catalogView/CatalogView"

export const metadata: Metadata = {
  title: "Top Selling Games - Browse Our Catalog",
  description:
    "Explore our collection of top-selling video games. Filter by genre and discover new releases. Shop the best games with great prices and fast delivery.",
}

interface HomeProps {
  searchParams: Promise<{ genre?: string; page?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  // Server-side rendering: we get the data on the server
  const params = await searchParams
  const genre = params.genre
  const page = parseInt(params.page || "1", 10)

  // Initial server-side fetch using abstractor directly
  const initialData = await gameAbstractor.fetchGames({
    genre,
    page,
  })

  return (
    <main id='main-content'>
      <CatalogView
        initialData={initialData}
        initialGenre={genre}
        initialPage={page}
      />
    </main>
  )
}

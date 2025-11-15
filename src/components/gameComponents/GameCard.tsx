/**
 * GameCard Component
 * Tarjeta de juego completamente responsive
 */

'use client';

import Image from 'next/image';
import { Card } from '../uiComponents/Card';
import { Button } from '../uiComponents/Button';
import { useTagInteraction } from '@/hooks/useTagInteraction';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  isInCart: boolean;
  onAddToCart: (game: Game) => Promise<void>;
  onRemoveFromCart: (gameId: string) => Promise<void>;
}

export function GameCard({
  game,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
}: GameCardProps) {
  const { trackAddToCart, trackRemoveFromCart } = useTagInteraction();

  const handleClick = async () => {
    if (isInCart) {
      // Ejecutar acción y tracking
      await onRemoveFromCart(game.id);
      trackRemoveFromCart({
        id: game.id,
        name: game.name,
        price: game.price,
        category: game.genre,
        quantity: 1,
      });
    } else {
      // Ejecutar acción y tracking
      await onAddToCart(game);
      trackAddToCart({
        id: game.id,
        name: game.name,
        price: game.price,
        category: game.genre,
        quantity: 1,
      });
    }
  };

  return (
    <article
      className="h-full"
      itemScope
      itemType="https://schema.org/Product"
      aria-label={`${game.name} - ${game.genre} game, $${game.price}`}
    >
      <Card padding="lg" hover className="overflow-hidden flex flex-col h-card w-card-mobile md:w-card-desktop">
        <div className="flex flex-col gap-5 h-full">

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface rounded-t-2xl rounded-b-none">
            {game.isNew && (
              <span
                className="absolute top-2 left-2 z-10 rounded bg-new-badge px-2 py-1 text-xs font-bold text-white uppercase"
                aria-label="New release"
              >
                New
              </span>
            )}
            <Image
              src={game.image}
              alt={`${game.name} cover art`}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              itemProp="image"
            />
          </div>


          <div className="flex flex-col gap-3 px-1">
            <p
              className="text-xs sm:text-sm text-text-secondary uppercase"
              itemProp="category"
            >
              {game.genre}
            </p>
            <div className="flex items-start justify-between">
              <h3
                className="text-sm sm:text-base font-semibold text-text-primary"
                itemProp="name"
              >
                {game.name}
              </h3>
              <p
                className="text-lg sm:text-xl font-bold text-text-primary"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <span itemProp="price" content={game.price.toString()}>
                  ${game.price}
                </span>
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
              </p>
            </div>
            <meta itemProp="description" content={game.description} />
          </div>


          <Button
            variant="outline"
            size="md"
            className="w-full h-14 rounded-lg border border-border px-6 py-4 gap-2 md:w-[332px]"
            onClick={handleClick}
            aria-label={isInCart ? `Remove ${game.name} from cart` : `Add ${game.name} to cart`}
          >
            {isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
          </Button>
        </div>
      </Card>
    </article>
  );
}

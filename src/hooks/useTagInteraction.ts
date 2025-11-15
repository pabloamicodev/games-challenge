/**
 * useTagInteraction Hook
 * 
 * Hook para gestionar el tracking de interacciones mediante Google Tag Manager (GTM).
 * Pushea eventos al dataLayer para análisis y seguimiento de comportamiento del usuario.
 * 
 * En producción, esto se integraría con:
 * - Google Tag Manager (GTM)
 * - Google Analytics 4 (GA4)
 * - Adobe Analytics
 * - Segment
 * - Mixpanel
 * 
 * Uso:
 * const { trackEvent } = useTagInteraction();
 * trackEvent('add_to_cart', { item_name: 'Game Name', price: 59.99 });
 */

'use client';

import { useCallback } from 'react';

// Tipos para eventos comunes de e-commerce
export interface TrackEventData {
  event: string;
  [key: string]: unknown;
}

// Eventos predefinidos (siguiendo GA4 recommended events)
export type EcommerceEvent =
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_item'
  | 'view_item_list'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'select_item'
  | 'view_cart'
  | 'add_payment_info'
  | 'add_shipping_info';

// Extender el objeto window para incluir dataLayer
declare global {
  interface Window {
    dataLayer: TrackEventData[];
  }
}

/**
 * Inicializa el dataLayer si no existe
 */
function initializeDataLayer(): void {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }
}

/**
 * Hook para tracking de interacciones
 */
export function useTagInteraction() {
  /**
   * Pushea un evento al dataLayer
   * 
   * @param event - Nombre del evento (preferiblemente usar eventos GA4)
   * @param data - Datos adicionales del evento
   * 
   * @example
   * trackEvent('add_to_cart', {
   *   currency: 'USD',
   *   value: 59.99,
   *   items: [{
   *     item_id: 'game-123',
   *     item_name: 'Cyber Warriors',
   *     item_category: 'Action',
   *     price: 59.99,
   *     quantity: 1
   *   }]
   * });
   */
  const trackEvent = useCallback((event: EcommerceEvent | string, data?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;

    initializeDataLayer();

    const eventData: TrackEventData = {
      event,
      timestamp: new Date().toISOString(),
      ...data,
    };

    window.dataLayer.push(eventData);

    if (process.env.NODE_ENV === 'development') {
      console.log('GTM Event', eventData);
    }

  }, []);


  const trackAddToCart = useCallback((item: {
    id: string;
    name: string;
    price: number;
    category?: string;
    quantity?: number;
  }) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: item.price * (item.quantity || 1),
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Games',
        price: item.price,
        quantity: item.quantity || 1,
      }],
    });
  }, [trackEvent]);


  const trackRemoveFromCart = useCallback((item: {
    id: string;
    name: string;
    price: number;
    category?: string;
    quantity?: number;
  }) => {
    trackEvent('remove_from_cart', {
      currency: 'USD',
      value: item.price * (item.quantity || 1),
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Games',
        price: item.price,
        quantity: item.quantity || 1,
      }],
    });
  }, [trackEvent]);


  const trackViewItem = useCallback((item: {
    id: string;
    name: string;
    price: number;
    category?: string;
  }) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Games',
        price: item.price,
      }],
    });
  }, [trackEvent]);

 
  const trackViewItemList = useCallback((items: Array<{
    id: string;
    name: string;
    price: number;
    category?: string;
  }>, listName?: string) => {
    trackEvent('view_item_list', {
      item_list_name: listName || 'Game Catalog',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Games',
        price: item.price,
      })),
    });
  }, [trackEvent]);


  const trackViewCart = useCallback((cartValue: number, itemCount: number) => {
    trackEvent('view_cart', {
      currency: 'USD',
      value: cartValue,
      item_count: itemCount,
    });
  }, [trackEvent]);


  const trackSearch = useCallback((searchTerm: string, results?: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      ...(results !== undefined && { results_count: results }),
    });
  }, [trackEvent]);

  /**
   * Track cuando el usuario inicia el proceso de checkout
   */
  const trackBeginCheckout = useCallback((cartValue: number, itemCount: number, items: Array<{
    id: string;
    name: string;
    price: number;
    category?: string;
    quantity: number;
  }>) => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: cartValue,
      item_count: itemCount,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || 'Games',
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackAddToCart,
    trackRemoveFromCart,
    trackViewItem,
    trackViewItemList,
    trackViewCart,
    trackSearch,
    trackBeginCheckout,
  };
}

/**
 * FEATURE FLAGS STORE - Reducer/State Management
 */

'use client';

import featureFlags from '@/config/feature-flags.json';


type Subscriber = (flags: FeatureFlagsState) => void;


export interface FeatureFlagsState {
  cart: {
    useDrawer: boolean;
    description: string;
  };
}

export const initialFeatureFlagsState: FeatureFlagsState = featureFlags;


let state: FeatureFlagsState = { ...initialFeatureFlagsState };
const subscribers = new Set<Subscriber>();


function notifySubscribers(): void {
  subscribers.forEach((subscriber) => subscriber(state));
}

/**
 * ACTIONS
 * Funciones que modifican el estado (similar a Redux actions + reducers)
 */

export function setFeatureFlags(flags: FeatureFlagsState): void {
  state = { ...flags };
  notifySubscribers();
}


export function setCartFeatureFlag(
  useDrawer: boolean,
  description?: string
): void {
  state = {
    ...state,
    cart: {
      useDrawer,
      description: description || state.cart.description,
    },
  };
  notifySubscribers();
}


export function setCartUseDrawer(useDrawer: boolean): void {
  state = {
    ...state,
    cart: {
      ...state.cart,
      useDrawer,
    },
  };
  notifySubscribers();
}


export function updateFeatureFlags(updates: Partial<FeatureFlagsState>): void {
  state = { ...state, ...updates };
  notifySubscribers();
}

/**
 * SELECTORS
 */


export function getFeatureFlagsState(): FeatureFlagsState {
  return { ...state };
}


export function getCartFeatureFlag(): { useDrawer: boolean; description: string } {
  return { ...state.cart };
}


export function getCartUseDrawer(): boolean {
  return state.cart.useDrawer;
}

/**
 * SUBSCRIPTION
 */

export function subscribeToFeatureFlags(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);
  
  return () => {
    subscribers.delete(subscriber);
  };
}


export function resetFeatureFlagsState(): void {
  state = { ...initialFeatureFlagsState };
  notifySubscribers();
}

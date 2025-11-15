/**
 * GAMES STORE - Reducer/State Management
 * 
 */

'use client';

import type { Game } from '@/types';

type Subscriber = (state: GamesState) => void;

export interface GamesState {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
  currentFilter?: string;
  isLoading: boolean;
}


export const initialGamesState: GamesState = {
  games: [],
  availableFilters: [],
  totalPages: 0,
  currentPage: 1,
  currentFilter: undefined,
  isLoading: false,
};

let state: GamesState = { ...initialGamesState };
const subscribers = new Set<Subscriber>();


function notifySubscribers(): void {
  subscribers.forEach((subscriber) => subscriber(state));
}

/**
 * ACTIONS
 * Funciones que modifican el estado (similar a Redux actions + reducers)
 * Los operators llaman a estas actions
 */


export function setGames(games: Game[]): void {
  state = { ...state, games };
  notifySubscribers();
}


export function setAvailableFilters(filters: string[]): void {
  state = { ...state, availableFilters: filters };
  notifySubscribers();
}


export function setPagination(totalPages: number, currentPage: number): void {
  state = { ...state, totalPages, currentPage };
  notifySubscribers();
}

export function setCurrentFilter(filter?: string): void {
  state = { ...state, currentFilter: filter };
  notifySubscribers();
}


export function setGamesLoading(isLoading: boolean): void {
  state = { ...state, isLoading };
  notifySubscribers();
}


export function updateGamesState(updates: Partial<GamesState>): void {
  state = { ...state, ...updates };
  notifySubscribers();
}


export function clearGames(): void {
  state = { ...initialGamesState };
  notifySubscribers();
}

/**
 * SELECTORS
 * Funciones para leer el estado (similar a Redux selectors)
 */


export function getGamesState(): GamesState {
  return { ...state };
}


export function getGames(): Game[] {
  return [...state.games];
}


export function getAvailableFilters(): string[] {
  return [...state.availableFilters];
}

export function getPagination(): { totalPages: number; currentPage: number } {
  return {
    totalPages: state.totalPages,
    currentPage: state.currentPage,
  };
}


export function getCurrentFilter(): string | undefined {
  return state.currentFilter;
}

export function isGamesLoading(): boolean {
  return state.isLoading;
}

export function getGameById(id: string): Game | undefined {
  return state.games.find((game) => game.id === id);
}

/**
 * SUBSCRIPTION
 */


export function subscribeToGames(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);
  
  return () => {
    subscribers.delete(subscriber);
  };
}

export function resetGamesState(): void {
  state = { ...initialGamesState };
  notifySubscribers();
}

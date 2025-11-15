/**
 * layer 2: STORE VIEWS - Feature Flags Store View
 */

'use client';

import { 
  getFeatureFlagsState, 
  subscribeToFeatureFlags,
  getCartUseDrawer as getCartUseDrawerSelector,
  getCartFeatureFlag as getCartFeatureFlagSelector,
  type FeatureFlagsState 
} from '@/store/featureFlagsStore';

/**
 * FeatureFlagsStoreView
 */
export const featureFlagsStoreView = {

  getState(): FeatureFlagsState {
    return getFeatureFlagsState();
  },


  subscribe(subscriber: (flags: FeatureFlagsState) => void): () => void {
    return subscribeToFeatureFlags(subscriber);
  },

  getCartUseDrawer(): boolean {
    return getCartUseDrawerSelector();
  },

  getCartConfig(): { useDrawer: boolean; description: string } {
    return getCartFeatureFlagSelector();
  }
};

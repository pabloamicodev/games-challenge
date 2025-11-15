/**
 * MainLayout Component
 * Main layout with Header, Footer, Drawer and Toast notifications
 */

"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Drawer } from "../uiComponents/Drawer"
import { CartContent } from "../cartComponents/CartContent"
import { featureFlagsStoreView } from "@/storeViews/featureFlagsStoreView"
import { ToastProvider } from "@/hooks/useToastContext"

interface MainLayoutProps {
  children: ReactNode
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [cartUseDrawer, setCartUseDrawer] = useState(() => featureFlagsStoreView.getCartUseDrawer())

  useEffect(() => {
    // Subscribe to feature flags
    const unsubscribe = featureFlagsStoreView.subscribe((state) => {
      setCartUseDrawer(state.cart?.useDrawer ?? false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleCartClick = () => {
    if (cartUseDrawer) {
      setIsDrawerOpen(true)
    }
    // If not using drawer, the Header Link will do the redirect
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header onCartClick={handleCartClick} />
      <main className='flex-grow !px-[20px]'>{children}</main>
      <Footer />

      {cartUseDrawer && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title='Your Cart'
        >
          <CartContent showBackButton={false} showCheckout />
        </Drawer>
      )}
    </div>
  )
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ToastProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ToastProvider>
  )
}

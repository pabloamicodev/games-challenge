/**
 * ToastContext
 * Global context for toast notifications
 */

"use client"

import {
  createContext,
  useContext,
  type ReactNode,
} from "react"
import { useToast } from "./useToast"
import { ToastContainer } from "@/components/uiComponents/ToastContainer"
import type { ToastType } from "@/components/uiComponents/Toast"

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, hideToast, showToast, success, error, info, warning } = useToast()

  return (
    <ToastContext.Provider
      value={{
        showToast,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}

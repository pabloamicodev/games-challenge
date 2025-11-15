/**
 * useToast Hook
 * Custom hook to manage toast notifications
 */

"use client"

import { useState, useCallback } from "react"
import type { ToastType } from "@/components/uiComponents/Toast"

export interface ToastData {
  id: number
  message: string
  type: ToastType
  duration?: number
}

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 30000) => {
      const id = ++toastId
      setToasts((prev) => {
        const newToasts = [...prev, { id, message, type, duration }];
        return newToasts;
      })
    },
    []
  )

  const hideToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "success", duration)
    },
    [showToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "error", duration)
    },
    [showToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "info", duration)
    },
    [showToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "warning", duration)
    },
    [showToast]
  )

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    info,
    warning,
  }
}

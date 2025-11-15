/**
 * Toast Component
 * Notification system for user feedback
 */

"use client"

import { useEffect } from "react"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-600 text-white",
}

const toastIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose, message, type])

  return (
    <div
      className={`
        fixed top-20 right-4 z-50
        min-w-[300px] max-w-[550px]
        px-4! py-3 rounded-lg shadow-lg
        flex items-center gap-3
        animate-slide-in
        ${toastStyles[type]}
      `}
      role="alert"
      aria-live="polite"
    >
      <span className="text-xl font-bold " aria-hidden="true">
        {toastIcons[type]}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-white hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  )
}

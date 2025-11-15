/**
 * ToastContainer Component
 * Container for displaying multiple toast notifications
 */

"use client"

import { Toast } from "./Toast"
import type { ToastData } from "@/hooks/useToast"

interface ToastContainerProps {
  toasts: ToastData[]
  onClose: (id: number) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  )
}

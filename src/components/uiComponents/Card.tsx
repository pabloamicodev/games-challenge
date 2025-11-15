/**
 * Card Component
 * Contenedor reutilizable para mostrar contenido
 */

import { type ReactNode, type HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  hover?: boolean
}

const paddingStyles = {
  none: "",
  sm: "p-3!",
  md: "p-4!",
  lg: "p-6!",
  xl: "p-12!",
}

export function Card({
  children,
  padding = "lg",
  hover = false,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "bg-white rounded-2xl border border-stroke-secondary"
  const hoverStyles = hover ? "transition-shadow hover:shadow-lg" : ""
  const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${className}`

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

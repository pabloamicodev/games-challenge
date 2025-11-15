"use client"

import { useEffect, useState } from "react"
import { type ButtonHTMLAttributes, type ReactNode } from "react"

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
}

const variantStyles = {
  primary: "bg-primary text-white",
  secondary: "bg-white text-primary border border-border",
  outline: "border-2 border-primary text-primary",
  danger: "bg-error text-white hover:bg-error/90",
}

const customStyles = {
  seeMore: "h-14 rounded-lg px-6 py-4 gap-2",
  addToCart:
    "h-14 rounded-lg border border-border px-6 py-4 gap-2 md:w-[332px]",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  isLoading?: boolean
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  "aria-label": ariaLabel,
  ...props
}: ButtonProps & { custom?: "seeMore" | "addToCart" }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseStyles =
    "font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  const widthStyles = fullWidth ? "w-full" : ""
  const customVariant = props.custom ? customStyles[props.custom] : ""
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${
    customVariant ? customVariant : sizeStyles[size]
  } ${widthStyles} ${className}`

  // Renderizamos solo en cliente
  if (!mounted) {
    return <button className={combinedClassName} disabled {...props} />
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      {...props}
    >
      {isLoading ? (
        <span className='flex items-center justify-center gap-2'>
          <svg
            className='animate-spin h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden='true'
            role='img'
          >
            <title>Loading</title>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

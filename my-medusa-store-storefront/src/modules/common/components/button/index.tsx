"use client"

import React, { forwardRef } from "react"

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60"

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500/20 border border-transparent",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-400/20 border border-slate-200",
  outline:
    "border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 active:bg-slate-100 focus:ring-slate-400/20",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300/20 border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500/20 border border-transparent",
} as const

const sizes = {
  sm: "min-h-[40px] px-4 py-2 text-sm",
  md: "min-h-[48px] px-6 py-3 text-sm",
  lg: "min-h-[56px] px-8 py-3.5 text-base",
  full: "w-full min-h-[56px] px-6 py-3 text-sm",
} as const

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
export default Button

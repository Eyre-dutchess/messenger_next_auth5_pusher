"use client";

import clsx from 'clsx';
import React from 'react' 

interface ButtonProps {
  children?: React.ReactNode
  type?: "submit" | "reset" | "button" | undefined
  fullWidth?: boolean
  secondary?: boolean
  danger?: boolean
  onClick?: ()=> void
  disabled?: boolean
}

export const Button = ({children, type, fullWidth, secondary, danger, onClick, disabled}: ButtonProps) => {
  return(
    <button type={type} onClick={onClick} disabled={disabled} className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm hover:shadow-lg hover:shadow-blue-200 foot-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
      disabled ? "opacity-50 cursor-default cursor-not-allowed":"cursor-pointer",
      fullWidth && "w-full",
      secondary ?"text-gray-900/75" :"text-white/95",
      danger && "bg-rose-500/75 hover:bg-rose-500 focus-visible:text-white/50",
      !secondary && !danger && "bg-sky-500/75 hover:bg-sky-500"
    )}>
        {children}
    </button>
  )
}

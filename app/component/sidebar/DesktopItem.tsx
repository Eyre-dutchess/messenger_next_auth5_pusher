"use client"

import React from 'react' 
import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: ()=> void
}

export const DesktopItem = ({label, href, icon: Icon, active, onClick}: DesktopItemProps) => {
  const handleClick = () =>{
    if(onClick){
      return onClick()
    }
  }
  return(
    <li onClick={handleClick}>
      <Link href={href}
        className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-800/50    hover:text-gray-800/50 hover:bg-gray-100/25`, 
          active && "bg-white/75 text-gray-800/75"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>  
  )
}

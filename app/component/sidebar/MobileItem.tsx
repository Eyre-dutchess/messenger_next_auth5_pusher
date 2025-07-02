"use client"

import Link from 'next/link'
import React from 'react' 
import clsx from 'clsx'

interface MobileItemProps {
  href: string
  icon: any
  onClick?: () => void
  active?: boolean
}

export const MobileItem = ({href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () =>{
    if(onClick){
      return onClick()
    }
  }
  return(
      <Link onClick={handleClick} href={href}
        className={clsx(`w-full group flex justify-center gap-x-3 p-3 text-sm leading-6 font-semibold text-gray-800/50  hover:text-gray-800/50 hover:bg-gray-100/25`, 
          active && "bg-blue-200/75 text-gray-800/75"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
      </Link> 
  )
}

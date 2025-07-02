"use client"

import React from 'react' 
import useConversations from '@/app/hook/useConversations'
import useRoutes from '@/app/hook/useRoutes'
import { MobileItem } from './MobileItem'

export const MobileFooter = () => {
  const routes = useRoutes()
  const {isOpen} = useConversations()
  if(isOpen){
    return null
  }
  return(
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
      {routes.map((item)=>{
        return(
          <MobileItem 
            key ={item.label}
            href = {item.href}
            active={item.active}
            icon = {item.icon}
            onClick={item.onClick}
          />
        )
      })}
    
    </div>
  )
}

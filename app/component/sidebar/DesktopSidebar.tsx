
"use client"

import React, { useState } from 'react' 
import { DesktopItem } from './DesktopItem'
import useRoutes from '@/app/hook/useRoutes'
import { User } from '@/app/generated/prisma'
import { Avatar } from '../Avatar'
import { SettingModal } from './SettingModal'


interface DesktopSidebarProps {
  curUser : User
}

export const DesktopSidebar = ({curUser}: DesktopSidebarProps) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)
    return(
    <>
        <SettingModal 
            isOpen={isOpen}
            curUser = {curUser}
            onClose = {()=> setIsOpen(false)}
        />
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[5em] xl:px-6 lg:overflow-y-auto bg-gradient-to-b from-white/25 to-blue-100/50 lg:border-r-[1px] border-white/75 lg:pb-4 lg:flex lg:flex-col justify-between">
            <nav className='mt-4 flex flex-col justify-between'>
                <ul role='list' className='flex flex-col items-center space-y-1'>
                    {routes.map((item:any)=>{
                        return(
                            <DesktopItem 
                                key={item.label}
                                href ={item.href}
                                label={item.label}
                                icon = {item.icon}
                                active = {item.active}
                                onClick={item.onClick}
                            />
                        )
                    })}
                </ul>
            </nav>
        </div>

        <nav className='w-full justify-center items-center z-40 absolute bottom-25 hidden lg:flex  lg:left-[calc(2.5em_-_50%)] '>
            <div onClick={()=> setIsOpen(true)} className='cursor-pointer hover:opacity-75 transition flex lg:flex-col flex-row items-center justify-center lg:gap-1 gap-3'>
                <h6 className='text-blue-400 font-semibold'>{curUser.name}</h6>
                <Avatar user = {curUser}/>
            </div>
        </nav>
    </>  
  )
}

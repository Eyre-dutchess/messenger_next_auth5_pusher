"use client"

import React from 'react' 
import { User } from '@/app/generated/prisma'
import { UserBox } from './UserBox'

interface UserListProps {
  items: User[]
}

export const UserList = ({items}: UserListProps) => {
  return(
    <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block bg-gradient-to-b from-white/5 via-blue-100/5 to-blue-100/25 overflow-y-auto border-r border-white/75 block w-full left-0'>
        <div className='px-5 md:w-2/3 lg:w-full mx-auto max-w-[600px]'>
            <div className='flex-col'>
                <div className='text-2xl font-bold text-white py-8'>People</div>
            </div>

            {items.map((item)=>{
                return (
                    <UserBox key={item.id} data={item}/>
                )
            })}
        </div>
    </aside>  
  )
}

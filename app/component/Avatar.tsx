"use client"

import Image from 'next/image'
import React from 'react' 

import { User } from '../generated/prisma'
import useActiveList from '../hook/useActiveList'
interface AvatarProps {
  user?: User 
  
}

export const Avatar = ({user}: AvatarProps) => {
  const {members} = useActiveList()
  const isActive = members.indexOf(user?.email!) !== -1;
  return(
    <div className='relative'>
        <div className='w-8 aspect-square rounded-full relative overflow-hidden'>
          <Image 
            src={user?.image || "/images/profile.png"}
            alt="avatar"
            fill
            style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"center"}}
            />
        </div>   
        {isActive && (
          <span className='absolute block rounded-full bg-green-600/95 ring-2 ring-white top-0 right-0 h-2 w-2'>
        </span> )}
    </div>
  )
}

"use client"

import React, { useMemo, useState } from 'react' 
import { HiChevronLeft } from 'react-icons/hi'
import Link from 'next/link'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

import { Avatar } from '@/app/component/Avatar'
import { Conversation, User } from '@/app/generated/prisma'
import useOtherUser from '@/app/hook/useOtherUser'
import { AvatarGroup } from '@/app/component/AvatarGroup'
import useActiveList from '@/app/hook/useActiveList'
import { ProfileDrawer } from './ProfileDrawer'

interface HeaderProps {
  conversation: Conversation& {
    users: User[]
  }
}

export const Header = ({conversation}: HeaderProps) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const {members} = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(()=>{
    if(conversation.isGroup){
      return `${conversation.users.length} members`
    }
    return isActive? "Active":"Offline";
  }, [conversation, isActive])
  return(
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={()=> setDrawerOpen(false)} />
      <div className='bg-white/50 z-40  flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
            href="/conversations">
            <HiChevronLeft size={32}/>
          </Link>
          {conversation.isGroup ?(
            <AvatarGroup users={conversation.users} />
          ):(
            <Avatar user={otherUser}/>
          )}
            <div className="flex flex-col">
              <div>{conversation.name || otherUser.name}</div>
              <div className="text-sm font-light text-neutral-500">{statusText}
              </div>
            </div>
        </div>
        <HiEllipsisHorizontal size={32} onClick={()=>setDrawerOpen(true)} className='text-sky-500 cursor-pointer hover:text-sky-600 transition'/>
      </div>
    </>
  )
}

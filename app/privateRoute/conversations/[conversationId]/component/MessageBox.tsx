"use client"

import React, { useState } from 'react' 
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { Avatar } from '@/app/component/Avatar'
import { FullMessageType } from '@/app/utils/type'
import { ImgModal } from './ImgModal'
interface MessageBoxProps {
  data: FullMessageType
  isLast?: boolean
}

export const MessageBox = ({data, isLast}: MessageBoxProps) => {
    
    const [modalOpen, setModalOpen] = useState(false)
    const session = useSession()
    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user)=> user.email !== data?.sender?.email)
        .map((user)=> user.name)
        .join(",");
    
    const container = clsx("flex gap-3 p-4", isOwn && "justify-end")
    const avatar = clsx(isOwn && "order-2");
    const body = clsx("flex flex-col gap-2", isOwn && "items-end")
    const message = clsx("text-sm w-fit overflow-hidden", isOwn ? "bg-sky-500/75 text-white/75":"bg-gray-100", data.image?"rounded-md p-0":"rounded-full py-2 px-3")
    return(
    <div className={container}>
        <div className={avatar && "w-6 h-6"}>
            <Avatar user = {data.sender} />
        </div>
        <div className={body}>
            <div className="w-full flex items-end justify-between ">
                <div className="text-sm text-gray-900/75">
                    {data.sender.name}
                </div>
                <div className="text-[10px] text-gray-800/50">
                    {format(new Date(data.createdAt), "p")}
                </div>
            </div>
            <div className={message}>
                <ImgModal src={data.image} isOpen={modalOpen} onClose={()=> setModalOpen(false)}/>
                {data.image? (
                    <Image onClick={()=> setModalOpen(true)}
                        alt="image" height="288" width="288" src={data.image}
                        className='object-over cursor-pointer hover:scale-105 transition translate'
                    />
                ):(
                    <div className='px-4'>{data.body}</div>
                ) }
            </div>
            {isLast && isOwn && seenList.length > 0 && (
                <div className='text-xs font-light text-gray-500/75'>
                    {`Seen by ${seenList}`}
                </div>
            )}
        </div>
    </div>
  )
}

"use client"
import React, { useEffect, useMemo, useState } from 'react' 
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {MdOutlineGroupAdd} from "react-icons/md"

import { User } from '@/app/generated/prisma'
import useConversations from '@/app/hook/useConversations'
import { FullConversationType } from '@/app/utils/type'
import { ConversationBox } from './ConversationBox'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'
import { GroupChatModal } from './GroupChatModal'
interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

export const ConversationList = ({initialItems, users}: ConversationListProps) => {
  const session = useSession()
  const router = useRouter()
  const {conversationId, isOpen} = useConversations()

  const [items, setItems] = useState(initialItems)
  const [modalOpen, setModalOpen] = useState(false)

  const pusherKey = useMemo(()=>{
    return session.data?.user?.email
  }, [session?.data?.user?.email])

  useEffect(()=>{
    if(!pusherKey){
      return;
    }

    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) =>{
      setItems((current)=>{
        if(find(current, {id: conversation.id})){
          return current;
        }
        return [conversation, ...current]
      })
    };

    const updateHandler = (conversation: FullConversationType) =>{
      setItems((current)=> current.map((curConversation)=>{
        if(curConversation.id === conversation.id){
          return {
            ...curConversation, messages: conversation.messages
          }
        }
        return curConversation
      }))
    }

    const removeHandler = (conversation: FullConversationType) =>{
      setItems((current)=> {
          return [...current.filter((conver)=> conver.id !== conversation.id)]
        })
      
      if(conversationId === conversation.id){
        router.push("/conversations")
      }
    }


    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return ()=>{
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind("conversation:new", newHandler)
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    }
  }, [pusherKey, conversationId, router])

  return(
    <>
      <GroupChatModal users = {users} modalOpen={modalOpen} onClose={()=> setModalOpen(false)}/>
      <aside className={clsx("fixed  inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-white/75", 
          isOpen?"hidden":"block w-full left-0"
      )}>
        <div className="px-5 sm:w-2/3 mx-auto max-w-[600px] lg:w-full ">
          <div className="flex justify-between mb-4 pt-8">
            <div className="text-2xl lg:text-3xl font-bold text-white">Messages</div>
            <div className="rounded-full p-2 bg-gray-100 text-gray-600/75 cursor-pointer hover:opacity-75 transition">
              <MdOutlineGroupAdd onClick={()=> setModalOpen(true)} size={24} />
            </div>
          </div>
          {items.map((item)=>{
            return (
              <ConversationBox key={item.id} data={item} selected = {conversationId === item.id}/>
            )
          })}
        </div>
      </aside>
    </>
  )
}

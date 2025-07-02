"use client"

import useConversations from '@/app/hook/useConversations'
import { FullMessageType } from '@/app/utils/type'
import React, { useEffect, useRef, useState } from 'react' 
import { MessageBox } from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'
interface BodyProps {
  initialMessages: FullMessageType[]
}

export const Body = ({initialMessages}: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const {conversationId} = useConversations()

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
    
  }, [conversationId])

  useEffect(()=>{
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();
    
    const messageHandler = (message: FullMessageType) =>{
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if(find(current, {id: message.id})){
          return current;
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView();
    }

    const updateMessageHandler = (newMessage: FullMessageType) =>{
      setMessages((current)=> current.map((curMessage) =>{
        if(curMessage.id === newMessage.id){
          return newMessage
        }
        return curMessage
      }))
    }
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return ()=>{
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new", messageHandler)
      pusherClient.unbind("message:update", updateMessageHandler);
    }
  }, [conversationId])
  return(
    <div className="flex-1 overflow-y-auto min-h-[80vh] z-40">
      {messages.map((mes, index)=>{
        return (
          <MessageBox key={index}  data={mes} isLast={index === messages.length -1}/>
        )
      })}
      <div ref={bottomRef} className='pt-24'></div>
    </div>
  )
}

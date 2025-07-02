"use server"
import React from 'react'

import { EmptyState } from '@/app/component/EmptyState'
import { Header } from './component/Header'
import { Body } from './component/Body'
import { Form } from './component/Form'
import { getConversationById } from '@/app/action/getConversationById'
import { getMessages } from '@/app/action/getMessages'

interface IParams {
  conversationId: string
}

const ConversationSinglePage = async ({params}:{params:Promise<IParams>}) =>{

    const conversation = await getConversationById(params)
    const messages = await getMessages(params)

    console.log(conversation)
    if(!conversation){
    return(
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState title="No messages yet." />
            </div>
        </div>
  )}

  return(
    <div className="lg:pl-80 min-h-[90vh]">
        <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
            <Body initialMessages={messages}/>
            <Form />
        </div>
    </div>
  )
}

export default ConversationSinglePage;
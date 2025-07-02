import React from 'react' 
import { ConversationList } from './component/ConversationList'
import getConversations from '@/app/action/getConversations'
import getUsers from '@/app/action/getUsers'
import { Sidebar } from '@/app/component/sidebar/Sidebar'


export default async function ConversationLayout({children}:{children: React.ReactNode}){
    const conversations = await getConversations()
    const users = await getUsers()
  return(
    <Sidebar>
        <div className='h-full'>
            <ConversationList 
                initialItems = {conversations}
                users = {users}
            />
            {children}
        </div>
    </Sidebar>
  )
}


import {getCurrentUser} from './getCurrentUser'
import prisma from "@/app/libs/prismadb"

interface IParams{
   conversationId: string
}
export const getConversationById =async (params: Promise<IParams>) => {
  try {
     const curUser = await getCurrentUser()
    if(!curUser?.email) return null;

     const {conversationId} = await params
     if(!conversationId || typeof conversationId !== "string"){
            throw new Error("invalid ID!")
        }
    const conversation = await prisma.conversation.findUnique({
        where:{
            id: conversationId
        },
        include:{
            users: true
        }
    })
    return conversation
  } catch (error: any) {
    throw new Error(error)
  }
}

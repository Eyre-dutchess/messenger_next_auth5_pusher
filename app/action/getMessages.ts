
import prisma from "@/app/libs/prismadb"
interface IParams{
   conversationId: string
}
export const getMessages = async (params: Promise<IParams>) => {
  try {
 
    const {conversationId} = await params
     if(!conversationId || typeof conversationId !== "string"){
            throw new Error("invalid ID!")
        }
    const messages = await prisma.message.findMany({
        where:{
            conversationId: conversationId
        },
        include:{
            sender: true,
            seen: true
        },
        orderBy:{
            createdAt: "asc"
        }
    })
    return messages
  } catch (error: any) {
    return []
  }
}


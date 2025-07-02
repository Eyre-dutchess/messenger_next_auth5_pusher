import prisma from "@/app/libs/prismadb"
import {getCurrentUser} from "./getCurrentUser"

const getConversations = async () =>{
    const curUser = await getCurrentUser()

    if(!curUser?.id){
        return[]
    }
    try {
        const conversations = await prisma.conversation.findMany({
            orderBy:{
                lastMessageAt: "desc"
            },
            where:{
                userIds:{
                    has: curUser.id
                }
            },
            include:{
                users: true,
                messages:{
                    include:{
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return conversations 
    } catch (error: any) {
        return []
    }
}

export default getConversations;
import {getCurrentUser} from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server"

interface IParams{
    conversationId?: string
}
export const DELETE = async (request: Request,
    {params}:{params: Promise<IParams>}
) : Promise<NextResponse> =>{
    try {
        const {conversationId} = await params;
        const curUser = await getCurrentUser()

        if(!curUser?.id){
            return new NextResponse("unauthorized", {status: 401})
        }
        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users: true
            }
        })

        if(!existingConversation){
            return new NextResponse("invalid ID", {status: 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id: conversationId,
                userIds:{
                    hasSome:[curUser.id]
                }
            }
        })
        existingConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, "conversation:remove", existingConversation)
            }
        })
        return NextResponse.json(deletedConversation)
    } catch (error: any) {
         return new NextResponse("internal error", {status: 500})
    }
}

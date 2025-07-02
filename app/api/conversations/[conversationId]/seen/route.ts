import {getCurrentUser }from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server"

interface IParams{
    conversationId?: string
}
export const POST = async (request: Request,
    {params}:{params: IParams}
) : Promise<NextResponse> =>{
    try {
        const {conversationId} = await params;
        const curUser = await getCurrentUser()

        if(!curUser?.id){
            return new NextResponse("unauthorized", {status: 401})
        }
        const conversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                messages:{
                    include:{
                        seen: true
                    }
                },
                users:true
            }
        })

        if(!conversation){
            return new NextResponse("invalid ID", {status: 400})
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if(!lastMessage){
            return NextResponse.json(conversation)
        }
        const updatedMessage = await prisma.message.update({
            where:{
                id: lastMessage.id
            },
            include:{
                sender: true,
                seen: true,
            },
            data:{
                seen:{
                    connect:{
                        id: curUser.id
                    }
                }
            }
        })
        
        await pusherServer.trigger(curUser.email!, "conversation:update", {
            id: conversationId,
            messages: [updatedMessage]
        });

        if(lastMessage.seenIds.indexOf(curUser.id) !== -1){
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId!,"message:update", updatedMessage)
        
        return NextResponse.json(updatedMessage)
    } catch (error: any) {
         return new NextResponse("internal error", {status: 500})
    }
}
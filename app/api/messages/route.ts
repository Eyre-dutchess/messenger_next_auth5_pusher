import {getCurrentUser }from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export const POST = async(request: Request):Promise<NextResponse>  =>{
    try {
        const curUser = await getCurrentUser()
        const body = await request.json()
        const {message, image, conversationId} = body

        if(!curUser?.id || !curUser?.email){
            return new NextResponse("unauthorized", {status: 401})
        }
        
        const newMessage = await prisma.message.create({
            data:{
                body:message, image: image, 
                conversation:{
                    connect:{id: conversationId}
                },
                sender: {
                    connect:{id: curUser.id}
                },
                seen:{
                    connect:{id: curUser.id}
                }
            },
            include:{
                seen: true,
                sender: true
            }
        });

        const updateConversation = await prisma.conversation.update({
            where:{
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            },
            include:{
                users: true,
                messages:{
                    include: {
                        seen: true
                    }
                }
            }
        });

        await pusherServer.trigger(conversationId, "messages:new", newMessage);

        const lastMessage = updateConversation.messages[updateConversation.messages.length - 1];
        updateConversation.users.map((user)=>{
            pusherServer.trigger(user.email!, "conversation:update", {
                id: conversationId,
                messages: [lastMessage]
            })
        })
        return NextResponse.json(newMessage)

    } catch (error: any) {
        console.log(error, "ERROR_messages");
        return new NextResponse("internal error", {status: 500}) 
    }
}
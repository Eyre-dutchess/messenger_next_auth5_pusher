import { NextResponse } from "next/server"
import {getCurrentUser} from "@/app/action/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { pusherServer } from "@/app/libs/pusher"

export const POST = async(request: Request):Promise<NextResponse>  =>{
    try {
    
       const curUser = await getCurrentUser()
       const body = await request.json()
       const {userId, isGroup, members, name} = body
       if(!curUser?.id || !curUser?.email){
        return new NextResponse("unauthorized", {status: 401})
       } 
       if(isGroup && (!members || members.length < 2 || !name)){
        return new NextResponse("invalid data", {status: 400})
       }
       if(isGroup){
        const newConversation = await prisma.conversation.create({
            data:{
                name, isGroup, users:{
                    connect:[
                        ...members.map((member: {value: string})=>({
                            id: member.value
                        })),
                        {
                            id: curUser.id
                        }
                    ]
                }
            },
            include:{
                users: true
            }
        });
        newConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, "conversation:new", newConversation)
            }
        })
        return NextResponse.json(newConversation)
       }


       const existingConversations = await prisma.conversation.findMany({
            where:{
                OR: [
                    {
                        userIds:{
                            equals:[curUser.id, userId]
                        }
                    },
                    {
                        userIds:{
                            equals:[userId, curUser.id]
                        }
                    }
                ]
            }
       });

       const singleConversation = existingConversations[0];
       if(singleConversation){
        return NextResponse.json(singleConversation)
       }

       const newConversation = await prisma.conversation.create({
            data:{
                users:{
                    connect:[
                        {
                            id: curUser.id
                        },
                        {id: userId}
                    ]
                }
            },
            include:{
                users: true
            }
       });
       newConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, "conversation:new", newConversation)
            }
        })
       return NextResponse.json(newConversation)

    } catch (error: any) {
        return new NextResponse("internal error", {status: 500})
    }
}
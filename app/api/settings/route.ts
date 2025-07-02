import {getCurrentUser }from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async(request: Request):Promise<NextResponse> =>{
    try {
        const curUser = await getCurrentUser()
        const body = await request.json()
        const {name, image} = body
        if(!curUser?.id){
            return new NextResponse("unauthorized", {status: 401})
        }
        const updatedUser = await prisma.user.update({
            where:{
                id: curUser.id
            },
            data:{
                image: image,
                name: name
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.log(error, "ERROR_SETTINGS");
        return new NextResponse("internal error", {status: 500})
    }
}
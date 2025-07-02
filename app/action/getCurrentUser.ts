
import prisma from "@/app/libs/prismadb"
import { auth } from "@/auth"

export const getCurrentUser = async() =>{
    try {
        const session = await auth()
        if(!session?.user?.email){
            return null
        }
        const curUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        })
        if(!curUser){
            return null
        }
        return curUser    
    } catch (error: any) {
        return error
    }
}
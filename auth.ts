
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import prisma from "@/app/libs/prismadb";
import authConfig from "@/auth.config";


export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
    events:{
        async linkAccount({user}){
            await prisma.user.update({
                where:{id: user.id},
                data:{emailVerified: new Date()}
            })
        }
    },
    callbacks:{
        async session({token, session}){
            if(token.sub && session.user){
                session.user.id = token.sub
            } 
            return session
        },
        async jwt({token}){
            return token
        }
    },
    pages:{
        signIn:"/auth/log-in",
        error:  "/auth/error",
        signOut:"/auth/log-in"
    },
    adapter: PrismaAdapter(prisma),
    session:{strategy:"jwt"},
    ...authConfig,
    
})



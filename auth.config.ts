import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { comparePasswords, generateSalt, hashPassword } from "./app/utils/password";
import { LogInSchema } from "./app/libs/authSchema";
import prisma from "@/app/libs/prismadb";

export default {
   providers:[
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
             async authorize(credentials){
                const validatedFields = LogInSchema.safeParse(credentials);
                if(!validatedFields.success){
                    throw new Error("invalid credentials")
                }
                const {email, password} = validatedFields.data;
                if(!email || !password ){
                        throw new Error("invalid credentials")
                    }
                
                const user = await prisma.user.findUnique({
                        where: {
                            email: email
                    }
                })    
                let salt = generateSalt()
                const pwHashed =await hashPassword(password, salt)
                
                if(!user || !user?.hashedPassword){
                    throw new Error("can't find user with this email")
                }
                const isPwCorrect =await comparePasswords({ password, salt, hashedPassword:pwHashed})
                if(!isPwCorrect){
                    throw new Error("wrong password")
                }
                return user
            }
        })
    
    ]
} satisfies NextAuthConfig;
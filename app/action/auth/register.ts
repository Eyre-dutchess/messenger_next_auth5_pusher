"use server"

import * as z from "zod"
import { RegisterSchema } from "@/app/libs/authSchema";
import prisma from "@/app/libs/prismadb";
import { generateSalt, hashPassword } from "@/app/utils/password";



export const register = async (values: z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return({error:"invalid fields!"})
    }
    const {email, password, name} = validatedFields.data;
    let salt = generateSalt()
    const pwHashed =await hashPassword(password, salt);

    const userByEmail = await prisma.user.findUnique({
        where:{ email: email}
    })
    if(userByEmail){
        return {error:"this email is already in use!"}
    }

    await prisma.user.create({
        data:{name, email, hashedPassword: pwHashed}
    })

    return {success:"register successful!"}
}
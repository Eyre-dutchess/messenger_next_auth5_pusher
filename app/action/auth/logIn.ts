"use server"

import * as z from "zod"
import { AuthError } from "next-auth";

import { LogInSchema } from "@/app/libs/authSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const logIn = async (values: z.infer<typeof LogInSchema>) =>{
    const validatedFields = LogInSchema.safeParse(values);
    if(!validatedFields.success){
        return({error:"invalid fields!"})
    }

    const {email, password} = validatedFields.data;
    try {
        await signIn("credentials", {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin": 
                // this is very specific or give an typeError find  more details
                // on  https://authjs.dev/reference/core/errors
                    return {error:"invalid credentials"};
                default:
                    return {error:"something went wrong"}
            }
        };
        throw error;
    }
   
}




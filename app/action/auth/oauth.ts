"use server"

import * as z from "zod"
import { AuthError } from "next-auth";

import { LogInSchema } from "@/app/libs/authSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const OAuth = async (provider: "google"|"github", url: string) =>{
    try {
        const {success, data: session} = await signIn(provider, {callbackUrl: url})
        console.log(session)
        

    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "InvalidProvider":
                    return {error:"invalid InvalidProvider"};
                default:
                    return {error:"something went wrong"}
            }
        };
        throw error;
    }
   
}





"use client"
import React, { useState, useTransition } from 'react' 
import { BsGithub, BsGoogle } from 'react-icons/bs';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import LoadingModal from './LoadingModal';
import { Button } from './modal/Button';

import { logIn } from '../action/auth/logIn';
import { LogInSchema } from '../libs/authSchema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import { Input } from '@/components/ui/input';

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    
    const form = useForm<z.infer<typeof LogInSchema>>({
        resolver: zodResolver(LogInSchema),
        defaultValues:{
            email: "",
            password:""
        } })
    const onSubmit = (values: z.infer<typeof LogInSchema>) =>{
        setError("")
        setSuccess("")
    
        startTransition(()=>{
           logIn(values)
              .then((data)=>{
                setError("log in failed")
                setSuccess("log in successful")
              })}) }

    const socialAction =(provider: "google" | "github") =>{
        signIn(provider, {redirectUrl: DEFAULT_LOGIN_REDIRECT})
    }
    
  if(isPending){
        return (<LoadingModal />)
    }
  return(
    <div className='w-4/5 mt-8 bg-white/50 shadow rounded-md md:rounded-lg overflow-hidden mx-auto sm:w-full sm:max-w-md'>
        <div className="w-full bg-white px-4 py-8 shadow  sm:px-10">
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                     <div>
                         <FormField
                            control={form.control}
                            name="email"
                            render={({field})=> (
                            <FormItem>
                                <FormLabel> Email: </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='johndoe@example.com' type="text"/>
                                </FormControl>
                            </FormItem>)}>
                        </FormField>
                    </div>
                    <div>
                         <FormField
                            control={form.control}
                            name="password"
                            render={({field})=> (
                            <FormItem>
                                <FormLabel> Password: </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='****' type="password"/>
                                </FormControl>
                            </FormItem>)}>
                        </FormField>
                    </div>
                    <Button disabled={isPending} fullWidth type="submit">log in</Button>
                </form>
            </Form>
            <div className='w-full mt-4 flex flex-row gap-2 items-center'>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
                <span className=' text-sm text-gray-400/75 whitespace-nowrap'>Or continue with </span>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-2'>
                <Button disabled={isPending}  onClick={()=> socialAction("github")}>
                    <BsGithub />
                </Button>
                <Button disabled={isPending}  onClick={()=> socialAction("google")}>
                    <BsGoogle />
                </Button>
            </div>

            <div className='w-full items-center justify-center gap-2 mt-6 flex flex-row text-sm text-gray-400/50'>
                <p >Don't have an account yet?</p>
                <Link href={"/auth/register"}><span className='hover:text-gray-500/75 text-gray-400 cursor-pointer hover:font-bold hover:underline underline-offset-4'>
                   Register now</span></Link>
            </div>
        </div>
    </div>
  )
}

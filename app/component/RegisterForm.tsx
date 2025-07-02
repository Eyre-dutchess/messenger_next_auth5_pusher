"use client";


import React, { useState, useTransition } from 'react' 
import { BsGithub, BsGoogle } from 'react-icons/bs';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

import LoadingModal from './LoadingModal';
import { Button } from './modal/Button';

import { RegisterSchema } from '../libs/authSchema';
import { register } from '../action/auth/register';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {Input} from "@/components/ui/input"

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
 
  const form = useForm<z.infer<typeof RegisterSchema>>({
            resolver: zodResolver(RegisterSchema),
            defaultValues:{
                name:"",
                email: "",
                password:""
            } })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
        setError("")
        setSuccess("")
        
      startTransition(()=>{
           register(values)
              .then((data)=>{
                setError(data.error)
                setSuccess(data.success)
              })
              .finally(()=>{
                redirect(DEFAULT_LOGIN_REDIRECT)
              }) })  }

    const socialAction = (provider: "google" | "github") =>{
         signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })  }
    
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
                            name="name"
                            render={({field})=> (
                            <FormItem>
                                <FormLabel> Name: </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='john doe' type="text"/>
                                </FormControl>
                            </FormItem>)}>
                        </FormField>
                    </div>
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
                    <Button disabled={isPending} fullWidth type="submit">Register</Button>
                </form>
            </Form>

            <div className='w-full mt-4 flex flex-row gap-2 items-center'>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
                <span className=' text-sm text-gray-400/75 whitespace-nowrap'>Or continue with </span>
                <p className='w-full h-[1px] bg-gray-400/75'></p>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-2'>
                <Button disabled={isPending}  type="submit" onClick={()=> socialAction("github")}>
                    <BsGithub />
                </Button>
                <Button disabled={isPending}  type="submit" onClick={()=> socialAction("google")}>
                    <BsGoogle />
                </Button>
            </div>

            <div className='w-full items-center justify-center gap-2 mt-6 flex flex-row text-sm text-gray-400/50'>
                <p >Already have an account yet?"</p>
                <Link href={"/auth/log-in"}><span className='hover:text-gray-500/75 cursor-pointer hover:font-bold hover:underline underline-offset-4'>
                   Log in now</span></Link>
            </div>
        </div>
    </div>
  )
}

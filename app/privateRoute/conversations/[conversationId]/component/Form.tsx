"use client"

import axios from 'axios'
import React from 'react' 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi'
import {CldUploadButton} from "next-cloudinary"

import { Input } from '@/app/component/modal/Input'
import useConversations from '@/app/hook/useConversations'
import { HiPhoto } from 'react-icons/hi2'
interface FormProps {
  
}

export const Form = ({}: FormProps) => {
  const {conversationId} = useConversations()

  const {register, handleSubmit, setValue, formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
      message:""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setValue("message", "", {shouldValidate: true})
    axios.post("/api/messages", {
      ...data, conversationId
    })
  }

  const handleUpload = (result: any) =>{
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
  }
  return(
    <div className="py-4 px-4  border-t flex items-center gap-2 justify-end lg:gap-4 w-full">
        <CldUploadButton options={{maxFiles: 1}} onSuccess={handleUpload} uploadPreset="fnhetpjm">
          <HiPhoto size={30} className='text-sky-500/75'/> 
        </CldUploadButton>

        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-[50vw]'> 
          <Input id="message" register={register} errors={errors} required placeholder="write a message"/>
          <button type="submit" className='rounded-full p-2 bg-sky-500/75 cursor-pointer hover:bg-sky-500 transition'>
            <HiPaperAirplane />
          </button>
        </form>
    </div>
  )
}

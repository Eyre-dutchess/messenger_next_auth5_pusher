import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react' 
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/app/component/modal/Button'
import { Input } from '@/app/component/modal/Input'
import { Modal } from '@/app/component/modal/Modal'
import { Select } from '@/app/component/modal/Select'
import { User } from '@/app/generated/prisma'
interface GroupChatModalProps {
  users: User[]
  modalOpen: boolean
  onClose: () => void
}

export const GroupChatModal = ({users, modalOpen, onClose}: GroupChatModalProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
      name:"",
      members:[]
    }
  })

  const members = watch("members")
  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    setLoading(true)
    axios.post("/api/conversations", {
      ...data, isGroup: true
    })
    .then(()=>{
      router.refresh()
      onClose()
    })
    .catch(()=>{
      toast.error("something went wrong")
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  return(
    <Modal isOpen={modalOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="border-b border-gray-900/10 pb-8">
            <h2 className='text-gray-900/75 text-xl font-semibold leading-7'>Create a group chat</h2>
            <p className='mt-1 text-sm font-light'>create a chat with more than 2 people</p>
            <div className="mt-4 flex flex-col gap-y-4">
              <Input register={register} label="Name" id="name" disabled={loading} required errors={errors}/>
              <Select 
                disabled={loading} label="Members" options={users.map((user)=>({
                  value: user.id, label: user.name
                }))}
                onChange={(value)=> setValue("members", value, {shouldValidate: true})}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={loading} onClick={onClose} type="button" secondary>Cancel</Button>
          <Button disabled={loading}  type="submit">Create</Button>
        </div>
      </form>
    </Modal>  
  )
}

"use client"

import { format } from 'date-fns'
import React, { Fragment, useMemo, useState } from 'react' 

import { Conversation, User } from '@/app/generated/prisma'
import useOtherUser from '@/app/hook/useOtherUser'
import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { Avatar } from '@/app/component/Avatar'
import { ConfirmModal } from './ConfirmModal'
import { AvatarGroup } from '@/app/component/AvatarGroup'
import useActiveList from '@/app/hook/useActiveList'

interface ProfileDrawerProps {
  isOpen: boolean
  onClose: ()=> void
  data: Conversation & {
    users: User[]
  }
}

export const ProfileDrawer = ({isOpen, onClose, data}: ProfileDrawerProps) => {
    const otherUser = useOtherUser(data)
    const [modalOpen, setModalOpen] = useState(false)
    const {members} = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const joinedDate = useMemo(()=>{
        return format(new Date(otherUser.createdAt), "PP")
    }, [otherUser.createdAt])
  
    const title = useMemo(()=>{
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(()=>{
        if(data.isGroup){
            return `${data.users.length} members`
        };
        return isActive? "Active": "Offline"
    }, [data, isActive])
    return(
    <>
        <ConfirmModal isOpen={modalOpen} onClose={()=> setModalOpen(false)}/>
        <Transition show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition show as={Fragment} enter="ease-out duration-500" enterFrom='opacity-0' 
              enterTo='opacity-100' leave='ease-in duration-500' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black/75 bg-opacity-40' />
            </Transition>

            <div className="fixed inset-0 overflow-hidden z-50">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-auto fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition show as={Fragment} enter="transform transition ease-in-out duration-500" 
                    enterFrom='translate-x-full' enterTo='translate-x-0' leave='transform transition ease-in-out duration-500' 
                    leaveTo='translate-x-full'>
                    <DialogPanel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-screen w-full flex-col overflow-y-scroll bg-gradient-to-b from-orange-400/75 via-blue-700/75 to-blue-100/75 py-6 shadow-xl">
                        <div className='px-4 sm:px-6'>
                          <div className="flex items-start justify-end">
                            <div className='ml-3 flex h-7 items-center'>
                              <button onClick={onClose} type="button" className='rounded-md bg-white text-gray-400 
                              hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'>
                                    <span className='sr-only'>Close Panel</span>
                                    <IoClose size={24}/>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
                          <div className='flex flex-col items-center'>
                            <div className='mb-2'>
                              {data.isGroup?(
                                <AvatarGroup users={data.users}/>
                                ):(
                                <Avatar user={otherUser}/>
                               )}
                            </div>
                            <div className='text-white/75 text-lg font-semibold'>{title}</div>
                            <div className='text-sm text-white/50'>{statusText}</div>
                            <div className="flex gap-10 my-8">
                               <div onClick={()=> setModalOpen(true)}  className="flex flex-col gap-3 items-center cursor-pointer">
                                  <div className="w-10 h-10 bg-blue-400/50 text-white/75 hover:bg-blue-400/75 hover:text-white hover:shadow-lg rounded-full flex items-center justify-center">
                                      <IoTrash size={20} />
                                  </div>
                                  <div className="text-sm font-light text-white/50">Delete</div>
                               </div> 
                            </div>
                            <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                               <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                                  {!data.isGroup && (
                                    <div className='text-sm font-medium text-white/50'>
                                       <dt className=' sm:w-40 sm:flex-shrink-0'>Email</dt>
                                       <dd className='mt-1 sm:col-span-2'>{otherUser.email}</dd>
                                    </div>)}
                                  {!data.isGroup && (
                                       <>
                                       <hr className='opacity-50'/>
                                       <div className='text-sm font-medium text-white/50'>
                                         <dt className=' sm:w-40 sm:flex-shrink-0'>Joined</dt>
                                         <dd className='mt-1  sm:col-span-2'>
                                            <time dateTime={joinedDate}>{joinedDate}</time>
                                         </dd>
                                       </div>
                                       </>
                                    )}
                               </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogPanel>
                  </Transition>
                </div>
              </div>
            </div>  
          </Dialog>
        </Transition>
    </>    
  )
}


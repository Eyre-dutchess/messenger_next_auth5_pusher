"use client"

import React, { Fragment } from 'react' 
import {IoClose} from "react-icons/io5"
import {Dialog, DialogPanel, Transition} from "@headlessui/react"

interface ModalProps {
  isOpen?: boolean
  onClose: ()=> void
  children: React.ReactNode
}

export const Modal = ({isOpen, onClose, children}: ModalProps) => {
  return(
    <Transition
        show={isOpen}
        as={Fragment}
    >
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition show
                as={Fragment} enter="ease-out duration-300" enterFrom='opacity-0' enterTo='opacity-100' 
                leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'
            >
                <div className='fixed z-50 inset-0 bg-gray-800 bg-opacity-85 transition-opacity'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
                        <Transition show as={Fragment}  enter="ease-out duration-300" enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' enterTo='opacity-100 translate-y-0 sm:scale-100' 
                            leave='ease-in duration-200' leaveFrom='opacity-100 translate-y-0 sm:scale-100' leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 py-8 text-left shadow-xsl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10'>
                                    <button onClick={onClose} type='button' className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'>
                                        <span className='sr-only'>Close</span>
                                        <IoClose className='h-6 w-6'/>
                                    </button>
                                </div>
                                {children}
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Transition>
        </Dialog>
    </Transition>
  )
}

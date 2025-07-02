"use client";

import React from 'react' 
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label?: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  placeholder?: string
}

export const Input = ({placeholder, id, label, type, required, register, errors, disabled}: InputProps) => {
  return(
    <div className='w-full'>
        <label className='block text-sm font-medium leading-6 text-gray-700/75' htmlFor={id}>{label}</label>
        <input id={id} type={type} placeholder={placeholder} autoComplete={id} disabled={disabled} {...register(id, {required})}
                className={clsx(`form-input block w-full rounded-md border-0 py-2 text-gray-700/75 shadow-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-400/50
                    focus:ring-2 focus:ring-inset focus:ring-sky-600/75 sm:text-sm sm:leadinng-6`, 
                    errors[id] && "focus:ring-rose-600/75", disabled && "opacity-50 cursor-default"
                )}
        />
    </div>
  )
}

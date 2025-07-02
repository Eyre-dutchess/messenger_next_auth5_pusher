

import React from 'react'
import Link from 'next/link'
import { UserList } from './component/UserList'
import getUsers from '@/app/action/getUsers'
import { getCurrentUser } from '@/app/action/getCurrentUser'
import { auth } from '@/auth'


export default async function page() {
  const users = await getUsers()
  const curUser = await getCurrentUser()


  if(!curUser || users.length < 1){
    return (
      <Link href={"/auth/log-in"}><p className='text-5xl text-white fixed top-50 left-50 z-50'>Back</p></Link>
    )
  }
  return (
      <div className='h-full'>
        <UserList items={users}/>
      </div>
    
  )
}

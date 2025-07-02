import { EmptyState } from '@/app/component/EmptyState'
import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
  return (
    <div>
        <EmptyState title="somethign went wrong" reset/>
    </div>
  )
}



// "use client"

// import React from 'react' 
// import { Button } from './modal/Button'
// import Link from 'next/link'
// interface EmptyStateProps {
//   title?: string
//   reset?: boolean
// }

// export const EmptyState = ({title, reset}: EmptyStateProps) => {
//   return(
//     <div className='mt-60 shadow-md relative z-40 rounded-md flex flex-col  items-center justify-center py-10 gap-5'>
//         <h3 className='w-full text-lg lg:text-xl text-center text-gray-800/75 text-bold'>{title}</h3>
//         {reset && (<Link href={"/auth/log-in"}><Button danger >go back</Button></Link>)}
//     </div>
//   )
// }

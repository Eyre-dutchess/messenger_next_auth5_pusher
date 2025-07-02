"use client"

import { EmptyState } from '@/app/component/EmptyState'
import Link from 'next/link'
import React from 'react'

export default function ErrorPage() {
  return (
    <div>
        <EmptyState title="somethign went wrong" />
        <Link href={"/privateRoute/users"}>back</Link>
    </div>
  )
}


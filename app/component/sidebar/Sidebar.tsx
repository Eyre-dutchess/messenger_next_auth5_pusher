
import React from 'react' 
import { DesktopSidebar } from './DesktopSidebar';
import { MobileFooter } from './MobileFooter';
import {getCurrentUser }from '@/app/action/getCurrentUser';

interface SidebarProps {
  children: React.ReactNode
}

export const Sidebar = async ({children}: SidebarProps) => {
  const curUser = await getCurrentUser()
  return(
    <div className='h-full '>
        <DesktopSidebar curUser = {curUser!} />
        <MobileFooter />
        <main className='lg:pl-20 h-full'>
            {children}
        </main>
    </div>
  )
}

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiChat, HiUsers } from 'react-icons/hi';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';


import useConversations from './useConversations';
import { signOut } from 'next-auth/react';

const useRoutes = () => {
    const pathName = usePathname();
    const {conversationId} = useConversations()

    const routes = useMemo(()=>[
        {
            label:"Chat",
            href:"/privateRoute/conversations",
            icon: HiChat,
            active: pathName === "/privateRoute/conversations" || !!conversationId
        },
        {
            label:"Users",
            href:"/privateRoute/users",
            icon: HiUsers,
            active: pathName === "/privateRoute/users"
        },
        {
            label:"Logout",
            href:"#",
            onClick: ()=> signOut(),
            icon: HiArrowLeftOnRectangle}
    ], [pathName, conversationId]);
    return routes
}

export default useRoutes
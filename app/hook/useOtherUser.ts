import { useMemo } from "react"
import { useSession } from "next-auth/react"

import { User } from "../generated/prisma"
import { FullConversationType } from "../utils/type"


const useOtherUser = (conversation: FullConversationType | {users: User[]}) => {
    const session = useSession()
    const otherUser = useMemo(()=>{
        const curEmail = session?.data?.user?.email;
        const otherUser = conversation.users.filter((item)=> item.email !== curEmail)
        return otherUser[0]
    }, [session?.data?.user?.email, conversation.users]);
    
    return otherUser
}

export default useOtherUser
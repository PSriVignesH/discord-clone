import React, { FC } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps{
  src?:string,
  className?:string
}

const UserAvatar:FC<UserAvatarProps>= ({src,className}) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10")}>
     <AvatarImage src={src}/>
    </Avatar>
  )
}

export default UserAvatar
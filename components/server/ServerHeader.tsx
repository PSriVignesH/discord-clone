"use client"
import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client'
import React, { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react'
import { useModal } from '@/hooks/useModalStore'


interface ServerHeaderProps{
  server:ServerWithMembersWithProfiles,
  role?:MemberRole
}

const ServerHeader:FC<ServerHeaderProps>= ({server,role}) => {
 const modal =useModal()
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR
  return (
   <DropdownMenu>
    <DropdownMenuTrigger className='focus:outline-none' asChild>
    <button className='w-full text-md font-semibold px-3  mr-4 flex items-center h-12
     border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 
     dark:hover:bg-zinc-700/50 transition'>
      {  server.name}
      <ChevronDown className='h-6.6 w-6.6 md:h-5 md:w-5 ml-auto mr-3 pr-3 md:mr-0 md:pr-0'/>
     </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
     {
      isModerator && (
        <DropdownMenuItem className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("invite",{server})}>
          Invite People
          <UserPlus className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
     {
      isAdmin && (
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("editServer",{server})}>
          Server Settings
          <Settings className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
     {
      isAdmin && (
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("members",{server})}>
          Manage Members
          <Users className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
     {
      isModerator && (
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("createChannel",{server})}>
          Create Channel
          <PlusCircle className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
     {
      isModerator && (
        <DropdownMenuSeparator />
      )
     }
     {
      isAdmin && (
        <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("deleteServer",{server})}>
          Delete Server
          <Trash className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
     {
      !isAdmin && (
        <DropdownMenuItem className=' text-rose-500 px-3 py-2 text-sm cursor-pointer' onClick={()=>modal.onOpen("leaveServer",{server})}>
            Leave Server 
          <LogOut className='h-4 w-4 ml-auto'/>
        </DropdownMenuItem>
      )
     }
    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default ServerHeader
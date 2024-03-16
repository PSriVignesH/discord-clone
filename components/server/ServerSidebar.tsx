import { currentProfile } from '@/lib/current-profile'
import db from '@/lib/prismadb'
import { MemberRole, channelType } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'
import ServerHeader from './ServerHeader'
import { CircleUserRound, Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ServerSearch from './ServerSearch'
import { Separator } from '@/components/ui/separator'
import ServerSection from './ServerSection'
import ServerChannel from './ServerChannel'
import ServerMember from './ServerMember'



interface ServerSidebarProps{
serverId:string
}

const iconMap:any={
  [channelType.TEXT]:<Hash className='mr-2 h-4 w-4'/>,
  [channelType.AUDIO]:<Mic className='mr-2 h-4 w-4'/>,
  [channelType.VIDEO]:<Video className='mr-2 h-4 w-4'/>
}

const roleIconMap:any ={
  [MemberRole.GUEST]:<CircleUserRound className="h-4 w-4 mr-2 text-green-500"/>,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}

const ServerSidebar:FC<ServerSidebarProps> = async({serverId}) => {
  const profile = await currentProfile()

  if(!profile){
    return redirect("/")
  }

  const server = await db.server.findUnique({
    where:{
      id:serverId
    },
    include:{
      channels:{
        orderBy:{
          createdAt:"asc"
        }
      },
      members:{
        include:{
          profile:true
        },
        orderBy:{
          role:"asc"
        }
      }
    }
  })

 
  const textChannels = server?.channels.filter((channel:any)=>channel.type === channelType.TEXT)
  const audioChannels = server?.channels.filter((channel:any)=>channel.type === channelType.AUDIO)
  const videoChannels = server?.channels.filter((channel:any)=>channel.type === channelType.VIDEO)
  const members = server?.members.filter((member:any)=>member.profileId !== profile.id)
 
  
  if(!server){
    return redirect("/")
  }  

  const role = server.members.find((member:any)=>member.profileId === profile.id)?.role
  return (
    <div className='flex  flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={server} role={role}/>
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch  data={[
            {
              label:"Text Channels",
              type:"channel",
              data:textChannels?.map((channel:any)=>(
               {
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
               }
              ))
            },
            {
              label:"Voice Channels",
              type:"channel",
              data:audioChannels?.map((channel:any)=>(
               {
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
               }
              ))
            },
            {
              label:"Video Channels",
              type:"channel",
              data:videoChannels?.map((channel:any)=>(
               {
                id:channel.id,
                name:channel.name,
                icon:iconMap[channel.type]
               }
              ))
            },
            {
              label:"Members",
              type:"member",
              data:members?.map((member:any)=>(
               {
                id:member.id,
                name:member.profile.name,
                icon:roleIconMap[member.role]
               }
              ))
            }
          ]}/>
        </div>
        <Separator  className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2'/>
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              ChannelType={channelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel:any) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              ChannelType={channelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel:any) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
          {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              ChannelType={channelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel:any) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )} 
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member:any) => (
               <ServerMember
               key={member.id}
               member={member}
               server={server}
             /> 
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ServerSidebar
"use client"

import {Dialog,DialogContent,DialogHeader,DialogTitle} from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModalStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useOrigin } from '@/hooks/useOrigin'
import { useState } from 'react'
import axios from 'axios'



const InviteModal = () => {
  const modal=useModal()
  const origin = useOrigin()

  

   const isModalOpen= modal.isOpen && modal.type ==="invite"
   const {server} =modal.data
 
   
 
     const [copied, setIsCopied] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
    
     const inviteUrl =`${origin}/invite/${server?.inviteCode}`

     const onCopy =()=>{
      navigator.clipboard.writeText(inviteUrl),
      setIsCopied(true)

      setTimeout(()=>{
        setIsCopied(false)
      },1000)
     }

     const onNew =async()=>{
      try {
        setIsLoading(true)
        const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

        modal.onOpen("invite",{server:response.data})
      } catch (error) {
        console.log(error);
        
      } finally{
   setIsLoading(false)
      }
     }
  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
      <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-center font-bold'>
        Invite Friends
      </DialogTitle>
      </DialogHeader>
       <div className='p-6'>
        <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
          Server Invite Link
        </Label>
        <div className='flex items-center mt-2 gap-x-2'>
          <Input  className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
          focus-visible:ring-offset-0' value={inviteUrl} disabled={isLoading} onChange={()=>{}}/>
         <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied 
                ? <Check className="w-4 h-4" /> 
                : <Copy className="w-4 h-4" />
              }
            </Button>
        </div>
        <Button size="sm" className='text-xs text-zinc-500 mt-4' variant="link" onClick={onNew} disabled={isLoading}>
          Generate a new link
         <RefreshCw className='w-4 h-4 ml-2'/>
        </Button>
       </div>
      </DialogContent>

    </Dialog>
  )
}

export default InviteModal  
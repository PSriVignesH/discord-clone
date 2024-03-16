"use client"

import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModalStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useOrigin } from '@/hooks/useOrigin'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



const LeaveServerModal = () => {
  const modal=useModal()
  const router = useRouter()

   const isModalOpen= modal.isOpen && modal.type ==="leaveServer"
   const {server} =modal.data
   const [isLoading, setIsLoading] = useState(false)
    
   const onClick =async()=>{
      try {
        setIsLoading(true) 
        await axios.patch(`/api/servers/${server?.id}/leave`)
        modal.onClose()
        router.refresh()
        router.push("/")
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
     }
  return (
    <Dialog open={isModalOpen} onOpenChange={modal.onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
      <DialogHeader className='pt-8 px-6'>
      <DialogTitle className='text-2xl text-center font-bold'>
        Leave Server
      </DialogTitle>
      <DialogDescription className='text-center text-zinc-500'>
        Are you sure want to leave <span className='font-semibold text-indigo-500'>{server?.name}</span>
      </DialogDescription>
      </DialogHeader>
      <DialogFooter className='bg-gray-100 px-6 py-4'>
        <div className=' flex items-center justify-between w-full'>
          <Button disabled={isLoading} variant="ghost" onClick={modal.onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="primary" onClick={onClick}>
            Confirm
          </Button>
        </div>
      </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}

export default LeaveServerModal  
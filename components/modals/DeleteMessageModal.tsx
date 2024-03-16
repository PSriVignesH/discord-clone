"use client"

import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from '@/components/ui/dialog'

import { useModal } from '@/hooks/useModalStore'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import qs from 'query-string'



const DeleteMessageModal = () => {
  const modal=useModal()


   const isModalOpen= modal.isOpen && modal.type ==="deleteMessage"
   const { apiUrl, query } = modal.data;
   const [isLoading, setIsLoading] = useState(false)
    
   const onClick =async()=>{
      try {
        setIsLoading(true) 
        const url = qs.stringifyUrl({
          url:apiUrl || "",
          query
         })
          
         await axios.delete(url)
 
        modal.onClose()
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
        Delete Channel
      </DialogTitle>
      <DialogDescription className='text-center text-zinc-500'>
        Are you sure want to do this? <br /> This mesage will be permanently deleted
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

export default DeleteMessageModal  
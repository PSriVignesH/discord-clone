"use client"

import CreateServerModal from "@/components/modals/CreateServerModal"
import { useEffect, useState } from "react"
import InviteModal from "@/components/modals/InviteModal"
import EditServerModal from "@/components/modals/EditServerModal"
import MembersModal from "@/components/modals/MembersModal"
import CreateChannelModal from "@/components/modals/CreateChannelModal"
import LeaveServerMOdal from "@/components/modals/LeaveServerModal"
import DeleteServerModal from "@/components/modals/DeleteServerModal"
import DeleteChannelModal from "@/components/modals/DeleteChannelModal"
import EditChannelModal from "@/components/modals/EditChannelModal"
import MessageFileModal from "@/components/modals/MessageFileModal"
import DeleteMessageModal from "@/components/modals/DeleteMessageModal"

const ModalProvider = () => {
  const [isMounted,setIsMounted] = useState(false) 

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }
   return (
    <>
    <CreateServerModal />
    <InviteModal/>
    <EditServerModal/>
    <MembersModal/>
    <CreateChannelModal />
    <LeaveServerMOdal/>
    <DeleteServerModal/>
    <DeleteChannelModal/>
    <EditChannelModal/>
    <MessageFileModal/>
    <DeleteMessageModal/>
    </>
  )
}

export default ModalProvider
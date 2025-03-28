import { SystemUser } from '@/types/chat'
import React from 'react'

interface ChatHeaderProps {
  room: string
  targetUserId: string | undefined
  patients: SystemUser[]
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ room, targetUserId, patients }) => {
  return (
    <div className='bg-white p-4 shadow-sm'>
      <h1 className='text-xl font-semibold'>
        {targetUserId
          ? `Private chat with ${
              patients.find(p => p.user_id === targetUserId)?.name
            }`
          : `#${room}`}
      </h1>
    </div>
  )
}

export default ChatHeader
import { SystemUser } from '@/types/chat'
import { useCall } from '@context/CallProvider'
import React from 'react'

interface ChatHeaderProps {
  room: string
  targetUserId: string | undefined
  patients: SystemUser[]
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  room,
  targetUserId,
  patients
}) => {
  const { startCall } = useCall()
  const currentPatient = patients.find(p => p.user_id === targetUserId)

  return (
    <div className='flex items-center justify-between bg-white p-4 shadow-sm'>
      <h1 className='text-xl font-semibold'>
        {targetUserId
          ? `Private chat with ${currentPatient?.name}`
          : `#${room}`}
      </h1>
      {targetUserId && currentPatient && (
        <button
          onClick={() => startCall(currentPatient)}
          className='flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' />
          </svg>
          Video Call
        </button>
      )}
    </div>
  )
}

export default ChatHeader

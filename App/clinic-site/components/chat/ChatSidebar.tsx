import React from 'react'
import ChatRoomsList from './ChatRoomList'
import OnlineUsersList from './OnlineUsersList'
import { LoginRes } from '@/types/user'
import { OnlineUser, SystemUser } from '@/types/chat'

interface ChatSidebarProps {
  room: string
  targetUserId: string | undefined
  user: LoginRes['user'] | null
  patients: SystemUser[]
  onlineUsers: OnlineUser[]
  onRoomChange: (room: string) => void
  onUserClick: (userId: string) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  room,
  targetUserId,
  user,
  patients,
  onlineUsers,
  onRoomChange,
  onUserClick,
}) => {
  return (
    <div className='w-64 bg-white p-4'>
      <h2 className='mb-4 text-xl font-bold'>Chat Rooms</h2>
      <ChatRoomsList room={room} onRoomChange={onRoomChange} />
      
      <div className='mt-8'>
        <h3 className='mb-2 font-semibold'>
          All Users ({patients.filter(p => p.user_id !== user?._id).length})
        </h3>
        <OnlineUsersList
          patients={patients}
          user={user}
          onlineUsers={onlineUsers}
          targetUserId={targetUserId}
          onUserClick={onUserClick}
        />
      </div>
    </div>
  )
}

export default ChatSidebar
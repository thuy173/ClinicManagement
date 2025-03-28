import { OnlineUser, SystemUser } from '@/types/chat'
import { LoginRes } from '@/types/user'
import React from 'react'

interface OnlineUsersListProps {
  patients: SystemUser[]
  user: LoginRes['user'] | null
  onlineUsers: OnlineUser[]
  targetUserId: string | undefined
  onUserClick: (userId: string) => void
}

const OnlineUsersList: React.FC<OnlineUsersListProps> = ({
  patients,
  user,
  onlineUsers,
  targetUserId,
  onUserClick,
}) => {
  return (
    <div className='space-y-1'>
      {patients
        .filter(p => p.user_id !== user?._id)
        .map(user => (
          <div
            key={user.user_id}
            className={`flex cursor-pointer items-center space-x-2 rounded p-2 ${
              targetUserId === user.user_id
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onUserClick(user.user_id)}
          >
            <div className='flex items-center justify-center text-sm'>
              {user.name}
              {onlineUsers.some(
                online => online.id === user.user_id
              ) && (
                <div className='ml-2 h-2 w-2 rounded-full bg-green-500'></div>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default OnlineUsersList
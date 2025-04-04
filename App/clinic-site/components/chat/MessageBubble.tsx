import Message, { SystemUser } from '@/types/chat'
import { LoginRes } from '@/types/user'
import React from 'react'

interface MessageBubbleProps {
  msg: Message
  user: LoginRes['user'] | null
  patients: SystemUser[]
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ msg, user, patients }) => {
  return (
    <div className={`flex ${
      msg.sender === user?._id ? 'justify-end' : 'justify-start'
    }`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          msg.sender === user?._id
            ? 'bg-blue-400 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className='mb-1 text-sm font-semibold'>
          {msg.sender === user?._id
            ? 'You'
            : patients.find(p => p.user_id === msg.sender)?.name ||
              msg.sender}
        </div>
        <div
          className='overflow-hidden text-ellipsis'
          style={{
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line'
          }}
        >
          {msg.content}
        </div>
        <div className='mt-1 text-xs opacity-75'>
          {new Date(msg.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
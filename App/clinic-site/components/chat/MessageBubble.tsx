import Message, { SystemUser } from '@/types/chat'
import { LoginRes } from '@/types/user'
import React from 'react'
import twemoji from 'twemoji'

interface MessageBubbleProps {
  msg: Message
  user: LoginRes['user'] | null
  patients: SystemUser[]
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ msg, user, patients }) => {
  const parseEmojis = React.useCallback((text: string) => {
    return twemoji.parse(text, {
      className: 'twemoji',
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
      size: 'svg',
      ext: '.svg'
    })
  }, [])

  return (
    <div className={`flex ${msg.sender === user?._id ? 'justify-end' : 'justify-start'}`}>
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
          className='overflow-hidden text-ellipsis emoji-message'
          style={{
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line'
          }}
          dangerouslySetInnerHTML={{ __html: parseEmojis(msg.content) }}
        />
        <div className='mt-1 text-xs opacity-75'>
          {new Date(msg.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
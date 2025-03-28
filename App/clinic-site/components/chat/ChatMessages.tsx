import React, { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import Message, { SystemUser } from '@/types/chat'
import { LoginRes } from '@/types/user'

interface ChatMessagesProps {
  messages: Message[]
  chats: Message[]
  currentRoomId: string
  targetUserId: string | undefined
  user: LoginRes['user'] | null
  patients: SystemUser[]
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  chats,
  currentRoomId,
  targetUserId,
  user,
  patients,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chats])

  const realTimeMessages = messages.filter(msg => 
    !chats.some(chat => chat._id === msg._id)
  )
  
  const allMessages = [...chats, ...realTimeMessages]

  const filteredMessages = allMessages.filter(msg => {
    if (targetUserId) {
      return (
        (msg.sender === user?._id && msg.target === targetUserId) ||
        (msg.sender === targetUserId && msg.target === user?._id)
      )
    }
    return msg.room === currentRoomId 
  })

  const sortedMessages = filteredMessages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  return (
    <div className='flex-1 space-y-4 overflow-y-auto p-4'>
      {sortedMessages.map((msg, index) => (
        <MessageBubble
          key={index}
          msg={msg}
          user={user}
          patients={patients}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
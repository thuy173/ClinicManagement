import React from 'react'
import { Send } from 'lucide-react'

interface MessageInputProps {
  message: string
  onMessageChange: (message: string) => void
  onSendMessage: (e: React.FormEvent) => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
}) => {
  return (
    <form onSubmit={onSendMessage} className='bg-white p-4 shadow-lg'>
      <div className='flex space-x-2'>
        <input
          type='text'
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          placeholder='Type your message...'
          className='flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          className='rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600'
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  )
}

export default MessageInput
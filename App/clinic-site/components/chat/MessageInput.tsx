import React from 'react'
import { Send } from 'lucide-react'
import EmojiPickerButton from './EmojiPickerButton'

interface MessageInputProps {
  message: string
  onMessageChange: (message: string) => void
  onSendMessage: (e: React.FormEvent) => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onSendMessage
}) => {
  const handleEmojiSelect = (emoji: string) => {
    onMessageChange(message + emoji)
  }

  return (
    <form onSubmit={onSendMessage} className='bg-white p-4 shadow-lg'>
      <div className='flex items-center space-x-2'>
        <input
          type='text'
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          placeholder='Type your message...'
          className='flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <EmojiPickerButton onEmojiClick={handleEmojiSelect} />

        <button
          type='submit'
          className='p-2 transition-colors'
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  )
}

export default MessageInput

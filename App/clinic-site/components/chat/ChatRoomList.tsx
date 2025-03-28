import React from 'react'

interface ChatRoomsListProps {
  room: string
  onRoomChange: (room: string) => void
}

const ChatRoomsList: React.FC<ChatRoomsListProps> = ({ room, onRoomChange }) => {
  return (
    <div className='space-y-2'>
      <button
        onClick={() => onRoomChange('general')}
        className={`w-full rounded p-2 text-left ${
          room === 'general'
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100'
        }`}
      >
        Common
      </button>
    </div>
  )
}

export default ChatRoomsList
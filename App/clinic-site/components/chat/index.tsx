'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import { useLayout } from '@context/LayoutContext'
import { useChatSocket } from '@hooks/useSocket'

const generateUserId = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substr(2, 5)
  return `user_${timestamp}_${randomStr}`
}
const ChatApp = () => {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('general')
  const [userId] = useState(generateUserId)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { setShowHeaderFooter } = useLayout()

  // Fetch messages history when entering a room
  // const fetchMessages = async (roomName: string) => {
  //   // try {
  //   //   setLoading(true)
  //   const response = await fetch(`${API_URL}/messages/${roomName}`)
  //   //   const contentType = response.headers.get('content-type')
  //   //   if (contentType && contentType.includes('application/json')) {
  //   const data = await response.json()
  //   if (data.success) {
  //     setMessages(data.messages)
  //   }
  //   //   } else {
  //   //     throw new Error('Received non-JSON response')
  //   //   }
  //   // } catch (error) {
  //   //   console.error('Error fetching messages:', error)
  //   // } finally {
  //   //   setLoading(false)
  //   // }
  // }

  // Save message to database
  // const saveMessage = async (messageData: Message) => {
  //   try {
  //     const response = await fetch(`${API_URL}/messages`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(messageData)
  //     })
  //     const data = await response.json()
  //     if (!data.success) {
  //       console.error('Failed to save message')
  //     }
  //   } catch (error) {
  //     console.error('Error saving message:', error)
  //   }
  // }

  // Hide Header/Footer on mount
  useEffect(() => {
    setShowHeaderFooter(false)
    return () => setShowHeaderFooter(true)
  }, [setShowHeaderFooter])

  const { messages, onlineUsers, connectionError, sendMessage, changeRoom } =
    useChatSocket({ userId, room })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    sendMessage(message)
    setMessage('')
  }

  const handleRoomChange = (newRoom: string) => {
    setRoom(newRoom)
    changeRoom(newRoom)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <section className='flex min-h-screen w-screen items-center justify-center'>
      {connectionError && (
        <div className='fixed right-4 top-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
          {connectionError}
        </div>
      )}

      <div className='flex h-screen w-full bg-gray-100'>
        {/* Sidebar */}
        <div className='w-64 bg-white p-4'>
          <h2 className='mb-4 text-xl font-bold'>Chat Rooms</h2>
          <div className='space-y-2'>
            <button
              onClick={() => handleRoomChange('general')}
              className={`w-full rounded p-2 text-left ${
                room === 'general'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              General
            </button>
            <button
              onClick={() => handleRoomChange('random')}
              className={`w-full rounded p-2 text-left ${
                room === 'random'
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              Random
            </button>
          </div>

          {/* Online Users */}
          <div className='mt-8'>
            <h3 className='mb-2 font-semibold'>Online Users</h3>
            <div className='space-y-1'>
              {onlineUsers
                .sort((a, b) => b.joinedAt - a.joinedAt)
                .map(user => (
                  <div key={user.id} className='flex items-center space-x-2'>
                    <div className='h-2 w-2 rounded-full bg-green-500'></div>
                    <span className='text-sm'>
                      {user.id === userId ? `${user.id} (You)` : user.id}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className='flex flex-1 flex-col'>
          <div className='bg-white p-4 shadow-sm'>
            <h1 className='text-xl font-semibold'>#{room}</h1>
          </div>

          {/* Messages */}
          <div className='flex-1 space-y-4 overflow-y-auto p-4'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === userId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === userId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className='mb-1 text-sm font-semibold'>{msg.sender}</div>
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
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className='bg-white p-4 shadow-lg'>
            <div className='flex space-x-2'>
              <input
                type='text'
                value={message}
                onChange={e => setMessage(e.target.value)}
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
        </div>
      </div>
    </section>
  )
}

export default ChatApp

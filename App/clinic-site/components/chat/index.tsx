'use client'

import React, { useState, useEffect } from 'react'
import { useLayout } from '@context/LayoutContext'
import { useChatSocket } from '@hooks/useSocket'
import { useAuth } from '@hooks/useAuth'
import { usePatientStore } from '@store/usePatientStore'
import { useChatStore } from '@store/useChatStore'
import ChatSidebar from './ChatSidebar'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import MessageInput from './MessageInput'
import { CallProvider } from '@context/CallProvider'
import { SystemUser } from '@/types/chat'

const ChatApp = () => {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('general')
  const [targetUserId, setTargetUserId] = useState<string | undefined>(
    undefined
  )
  const { setShowHeaderFooter } = useLayout()
  const { patients, fetchPatients } = usePatientStore()
  const { chats, fetchChats } = useChatStore()

  const {
    messages,
    onlineUsers,
    connectionError,
    sendMessage,
    changeRoom,
    currentRoomId,
    socket
  } = useChatSocket({ userId: user?._id, room, targetUserId })

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  useEffect(() => {
    fetchChats(currentRoomId)
  }, [currentRoomId, fetchChats])

  useEffect(() => {
    setShowHeaderFooter(false)
    return () => setShowHeaderFooter(true)
  }, [setShowHeaderFooter])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    sendMessage(message)
    setMessage('')
  }

  const handleRoomChange = (newRoom: string) => {
    setRoom(newRoom)
    setTargetUserId(undefined)
    changeRoom(newRoom)
  }

  const handleUserClick = (userId: string) => {
    setTargetUserId(userId)
    setRoom('private')
    changeRoom('private', userId)
  }

  if (!user) {
    return <div>Loading or unauthorized...</div>
  }

  const systemUser: SystemUser = {
    user_id: user._id,
    name: user.username
    // Add other required properties from SystemUser interface
  }

  return (
    <>
      {socket ? (
        <CallProvider socket={socket} currentUser={systemUser}>
          <section className='flex min-h-screen w-screen items-center justify-center'>
            {connectionError && (
              <div className='fixed right-4 top-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
                {connectionError}
              </div>
            )}

            <div className='flex h-screen w-full bg-gray-50'>
              <ChatSidebar
                room={room}
                targetUserId={targetUserId}
                user={user}
                patients={patients}
                onlineUsers={onlineUsers}
                onRoomChange={handleRoomChange}
                onUserClick={handleUserClick}
              />

              <div className='flex flex-1 flex-col'>
                <ChatHeader
                  room={room}
                  targetUserId={targetUserId}
                  patients={patients}
                />

                <ChatMessages
                  messages={messages}
                  chats={chats}
                  currentRoomId={currentRoomId}
                  targetUserId={targetUserId}
                  user={user}
                  patients={patients}
                />

                <MessageInput
                  message={message}
                  onMessageChange={setMessage}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </section>
        </CallProvider>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <p className='text-lg'>Connecting to chat server...</p>
        </div>
      )}
    </>
  )
}

export default ChatApp

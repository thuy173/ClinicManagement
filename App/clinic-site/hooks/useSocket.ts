import Message, { OnlineUser } from '@/types/chat'
import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5052'

interface UseChatSocketProps {
  userId: string
  room: string
}

interface UseChatSocketReturn {
  socket: Socket | null
  messages: Message[]
  onlineUsers: OnlineUser[]
  connectionError: string | null
  sendMessage: (content: string) => void
  changeRoom: (newRoom: string) => void
}

export const useChatSocket = ({
  userId,
  room
}: UseChatSocketProps): UseChatSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // Khởi tạo kết nối socket
  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      path: '/socket.io/',
      autoConnect: true,
      forceNew: true,
      auth: {
        userId
      }
    })

    // Xử lý các events kết nối
    socketInstance.on('connect_error', error => {
      console.error('Connection error:', error.message)
      setConnectionError(`Connection failed: ${error.message}`)
    })

    socketInstance.on('connect_timeout', () => {
      console.error('Connection timeout')
      setConnectionError('Connection timeout - please try again')
    })

    socketInstance.on('disconnect', reason => {
      console.log('Disconnected:', reason)
      if (reason === 'io server disconnect') {
        socketInstance.connect()
      }
    })

    socketInstance.on('ping', () => {
      socketInstance.emit('pong')
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [userId])

  // Xử lý room và messages
  useEffect(() => {
    if (!socket) return

    socket.emit('join_room', { userId, room })

    socket.on('new_message', (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage])
    })

    socket.on('user_joined', (data: { userId: string }) => {
      setOnlineUsers(prev => {
        if (prev.some(user => user.id === data.userId)) {
          return prev
        }
        return [...prev, { id: data.userId, joinedAt: Date.now() }]
      })
    })

    socket.on('user_left', (data: { userId: string }) => {
      setOnlineUsers(prev => prev.filter(user => user.id !== data.userId))
    })

    return () => {
      socket.off('new_message')
      socket.off('user_joined')
      socket.off('user_left')
    }
  }, [room, socket, userId])

  const sendMessage = (content: string) => {
    if (!socket || !content.trim()) return

    const newMessage = {
      content,
      room,
      sender: userId,
      timestamp: new Date()
    }

    socket.emit('send_message', newMessage)
  }

  const changeRoom = (newRoom: string) => {
    if (!socket) return

    socket.emit('leave_room', room)
    socket.emit('join_room', { userId, newRoom })
  }

  return {
    socket,
    messages,
    onlineUsers,
    connectionError,
    sendMessage,
    changeRoom
  }
}

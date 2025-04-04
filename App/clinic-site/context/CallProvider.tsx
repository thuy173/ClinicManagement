import { createContext, useContext, ReactNode, useState } from 'react'
import { Socket } from 'socket.io-client'
import { SystemUser } from '@/types/chat'
import CallManager from '@components/chat/CallManager'

interface CallContextType {
  startCall: (user: SystemUser) => void
  endCall: () => void
  currentCall: SystemUser | null
}

const CallContext = createContext<CallContextType | undefined>(undefined)

export const CallProvider: React.FC<{
  children: ReactNode
  socket: Socket
  currentUser: SystemUser
}> = ({ children, socket, currentUser }) => {
  const [currentCall, setCurrentCall] = useState<SystemUser | null>(null)

  const startCall = (user: SystemUser) => {
    setCurrentCall(user)
  }

  const endCall = () => {
    setCurrentCall(null)
  }

  return (
    <CallContext.Provider value={{ startCall, endCall, currentCall }}>
      {children}
      {currentCall && (
        <div className="fixed inset-0 z-50">
          <CallManager
            currentChat={currentCall}
            socket={socket}
            currentUser={currentUser}
          />
        </div>
      )}
    </CallContext.Provider>
  )
}

export const useCall = () => {
  const context = useContext(CallContext)
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider')
  }
  return context
}
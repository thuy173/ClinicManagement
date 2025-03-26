'use client'

import useToastStore from '@store/useMessageStore'
import { useEffect, useState } from 'react'

const ToastContainer = () => {
  const { messages, removeMessage } = useToastStore()
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])

  useEffect(() => {
    setVisibleMessages(messages)
  }, [messages])

  const getTypeClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 bg-opacity-[.17] border border-green-200 text-green-600'
      case 'error':
        return 'bg-red-500 bg-opacity-[.17] border border-red-200 text-red-600'
      case 'warning':
        return 'bg-yellow-500 bg-opacity-[.17] border border-yellow-200 text-yellow-600'
      case 'info':
        return 'bg-blue-500 bg-opacity-[.17] border border-blue-200 text-blue-600'
      default:
        return 'bg-gray-500 bg-opacity-[.17] border border-gray-200 text-gray-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <i
            className='lni lni-check-circle-1 mr-3 text-green-600'
            style={{
              fontSize: '24px'
            }}
          ></i>
        )
      case 'error':
        return (
          <i
            className='lni lni-xmark-circle mr-3 text-xl text-red-600'
            style={{
              fontSize: '24px'
            }}
          ></i>
        )
      case 'warning':
        return (
          <i
            className='lni lni-question-mark-circle mr-3 text-xl text-yellow-600'
            style={{
              fontSize: '24px'
            }}
          ></i>
        )
      case 'info':
        return (
          <i
            className='lni lni-information mr-3 text-xl text-blue-600'
            style={{
              fontSize: '24px'
            }}
          ></i>
        )
      default:
        return (
          <i
            className='lni lni-info mr-3 text-xl text-gray-600'
            style={{
              fontSize: '24px'
            }}
          ></i>
        )
    }
  }

  const groupedMessages = visibleMessages.reduce(
    (acc, message) => {
      const position = message.position || 'bottom-right'
      if (!acc[position]) {
        acc[position] = []
      }
      acc[position].push(message)
      return acc
    },
    {} as Record<string, typeof messages>
  )

  return (
    <>
      {Object.entries(groupedMessages).map(([position, messages]) => (
        <div
          key={position}
          className={`fixed z-50 ${position.includes('center') ? 'w-full' : ''}`}
          style={{
            pointerEvents: 'none',
            ...(position.includes('top') ? { top: 4 } : { bottom: 4 }),
            ...(position.includes('left')
              ? { left: 4 }
              : position.includes('right')
                ? { right: 4 }
                : {})
          }}
        >
          <div
            className={`flex flex-col p-4 ${position.includes('center') ? 'items-center' : position.includes('right') ? 'items-end' : 'items-start'}`}
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={`${getTypeClasses(message.type || 'info')} pointer-events-auto w-full max-w-xs rounded-lg px-8 py-4 shadow-sm transition-all duration-300`}
              >
                <div className='flex items-center justify-start'>
                  <div className='flex items-center'>
                    {getTypeIcon(message.type || 'info')}
                    <p className='font-sans text-sm'>{message.message}</p>
                  </div>
                  {/* <button
                    onClick={() => removeMessage(message.id)}
                    className="ml-5 text-white hover:text-gray-200"
                  >
                    &times;
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default ToastContainer

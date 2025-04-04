'use client'

import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { Smile } from 'lucide-react'

interface EmojiPickerButtonProps {
  onEmojiClick: (emoji: string) => void
}

const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ onEmojiClick }) => {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiClick(emojiData.emoji)
    setShowPicker(false)
  }

  return (
    <div className="" ref={pickerRef}>
      <button
        type="button"
        className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation()
          setShowPicker(!showPicker)
        }}
      >
        <Smile size={20} />
      </button>
      
      {showPicker && (
        <div className="absolute bottom-14 right-5 z-50">
          <div className="w-[300px] shadow-lg rounded-lg overflow-hidden">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={350}
              theme={Theme.AUTO}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
              searchDisabled
              lazyLoadEmojis
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EmojiPickerButton
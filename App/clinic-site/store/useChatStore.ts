import Message from '@/types/chat'
import { getAll } from '@services/chatService'
import { create } from 'zustand'

type ChatState = {
  chats: Message[]
  loading: boolean
  error: string | null
}

type ChatActions = {
  fetchChats: (room: string) => Promise<void>
  reset: () => void
}

const initialState: ChatState = {
  chats: [],
  loading: false,
  error: null
}

export const useChatStore = create<ChatState & ChatActions>(set => ({
  ...initialState,

  fetchChats: async (room: string) => {
    set({ loading: true, error: null })
    try {
      const chats = await getAll(room)
      set({ chats, loading: false })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch chats'
      })
    }
  },

  reset: () => {
    set(initialState)
  }
}))

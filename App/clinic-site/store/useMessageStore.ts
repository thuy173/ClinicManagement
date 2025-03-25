import { create } from 'zustand';

type ToastMessage = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

type ToastState = {
  messages: ToastMessage[];
  addMessage: (message: Omit<ToastMessage, 'id'>) => void;
  removeMessage: (id: string) => void;
  clearAllMessages: () => void;
};

const useToastStore = create<ToastState>((set) => ({
  messages: [],
  
  addMessage: (message) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    set((state) => ({
      messages: [...state.messages, { ...message, id }]
    }));
    
    // Tự động xóa message sau khoảng thời duration (mặc định 5000ms)
    const duration = message.duration || 5000;
    setTimeout(() => {
      useToastStore.getState().removeMessage(id);
    }, duration);
  },
  
  removeMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id)
    }));
  },
  
  clearAllMessages: () => {
    set({ messages: [] });
  }
}));

export default useToastStore;
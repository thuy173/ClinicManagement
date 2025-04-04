import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

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
const generateId = () => {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return uuidv4();
};
const useToastStore = create<ToastState>((set) => ({
  messages: [],
  
  addMessage: (message) => {
    const id = generateId();
    
    set((state) => ({
      messages: [...state.messages, { ...message, id }]
    }));
    
    const duration = message.duration || 3000;
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
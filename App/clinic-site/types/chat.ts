export default interface Message {
  _id: string
  sender: string
  content: string
  timestamp: Date
  room: string
  target: string
}

export interface OnlineUser {
  id: string
  joinedAt: number
}

export interface SystemUser {
  user_id: string
  name: string
  phone?: string
  email?: string
  avatar?: string
}

export interface CallData {
  roomId: string;
  callerId: string;
  calleeId: string;
  signalData?: any;
}

export interface IncomingCall {
  roomId: string;
  callerId: string;
  callerName: string;
}
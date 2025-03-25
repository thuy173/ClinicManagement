export default interface Message {
  sender: string
  content: string
  timestamp: Date
  room: string
}

export interface OnlineUser {
  id: string
  joinedAt: number
}

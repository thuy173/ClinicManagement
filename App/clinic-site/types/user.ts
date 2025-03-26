export interface LoginReq {
  username: string
  password: string
}
export interface LoginRes {
  message?: string
  user: {
    _id: string
    username: string
    role_id: string
    verifyToken?: string
    createdAt: string
    updatedAt: string
  }
  token?: string
  refreshToken?: string
}

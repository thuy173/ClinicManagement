export interface LoginResponse {
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

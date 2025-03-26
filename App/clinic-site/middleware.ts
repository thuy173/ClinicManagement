import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value
  const { pathname } = request.nextUrl

  // Nếu đã đăng nhập (có token) mà cố truy cập /login => redirect về trang chính
  if (authToken && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Nếu không có token và cố truy cập trang cần auth => redirect về /login
  if (!authToken && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
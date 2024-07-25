// middleware/authMiddleware.ts

import { NextRequest, NextResponse } from 'next/server'

import { keys } from 'config'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(keys.localStorage)

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname === '/') {
    console.log('login')
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}

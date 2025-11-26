import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        if (request.nextUrl.pathname.startsWith('/farmer') ||
            request.nextUrl.pathname.startsWith('/owner') ||
            request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        return NextResponse.next()
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret')
        const { payload } = await jwtVerify(token, secret)
        const role = payload.role as string

        if (request.nextUrl.pathname.startsWith('/farmer') && role !== 'FARMER') {
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (request.nextUrl.pathname.startsWith('/owner') && role !== 'OWNER') {
            return NextResponse.redirect(new URL('/', request.url))
        }
        if (request.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // Redirect logged in users away from auth pages
        if (request.nextUrl.pathname.startsWith('/auth')) {
            if (role === 'FARMER') return NextResponse.redirect(new URL('/farmer', request.url))
            if (role === 'OWNER') return NextResponse.redirect(new URL('/owner', request.url))
            if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        // Invalid token
        const response = NextResponse.redirect(new URL('/auth/login', request.url))
        response.cookies.delete('token')
        return response
    }
}

export const config = {
    matcher: ['/farmer/:path*', '/owner/:path*', '/admin/:path*', '/auth/:path*'],
}

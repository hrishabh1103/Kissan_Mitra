import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, password, role } = body

        if (!name || (!email && !phone) || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined },
                    { phone: phone || undefined }
                ]
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role
            }
        })

        // Create JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret')
        const token = await new SignJWT({ id: user.id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret)

        const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, role: user.role } })

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return response

    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

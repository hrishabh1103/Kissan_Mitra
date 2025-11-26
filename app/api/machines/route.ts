import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

async function getUser(request: Request) {
    const token = (await cookies()).get('token')?.value
    if (!token) return null
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret')
        const { payload } = await jwtVerify(token, secret)
        return payload
    } catch {
        return null
    }
}

export async function GET(request: Request) {
    const user = await getUser(request)
    if (!user || user.role !== 'OWNER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const machines = await prisma.machine.findMany({
            where: { ownerId: user.id as string },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ machines })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const user = await getUser(request)
    if (!user || user.role !== 'OWNER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { type, availability } = body

        if (!type || !availability) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const machine = await prisma.machine.create({
            data: {
                type,
                availability,
                ownerId: user.id as string
            }
        })

        return NextResponse.json({ machine })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

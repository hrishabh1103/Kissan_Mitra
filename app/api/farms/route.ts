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
    if (!user || user.role !== 'FARMER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const farms = await prisma.farm.findMany({
            where: { farmerId: user.id as string },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ farms })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const user = await getUser(request)
    if (!user || user.role !== 'FARMER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { location, cropType, landArea } = body

        if (!location || !cropType || !landArea) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const farm = await prisma.farm.create({
            data: {
                location,
                cropType,
                landArea,
                farmerId: user.id as string
            }
        })

        return NextResponse.json({ farm })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

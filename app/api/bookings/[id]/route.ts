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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getUser(request)
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Await params before using them
        const { id } = await params
        const body = await request.json()
        const { machineId, status } = body

        const updateData: any = {}
        if (machineId) updateData.machineId = machineId
        if (status) updateData.status = status

        if (machineId && !status) {
            updateData.status = 'ASSIGNED'
        }

        const booking = await prisma.booking.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ booking })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

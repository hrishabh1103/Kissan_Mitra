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
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        let whereClause: any = {}
        if (user.role === 'FARMER') {
            whereClause.farmerId = user.id
        } else if (user.role === 'OWNER') {
            // For owners, we might want to show requests assigned to them or available requests
            // For MVP, let's say they see bookings assigned to their machines
            // But wait, machines are assigned to bookings.
            // So we find bookings where machineId belongs to one of owner's machines.
            // This is complex for a simple GET.
            // Let's simplify: Owners see bookings assigned to them.
            // But initially bookings have no machine.
            // Admin assigns machine.
            // So Owner sees bookings where booking.machine.ownerId = user.id
            const machines = await prisma.machine.findMany({
                where: { ownerId: user.id as string },
                select: { id: true }
            })
            const machineIds = machines.map(m => m.id)
            whereClause.machineId = { in: machineIds }
        }

        const bookings = await prisma.booking.findMany({
            where: whereClause,
            include: {
                farm: true,
                machine: true,
                farmer: { select: { name: true, phone: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ bookings })
    } catch (error) {
        console.error(error)
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
        const { farmId, preferredDate, preferredSlot } = body

        if (!farmId || !preferredDate || !preferredSlot) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const booking = await prisma.booking.create({
            data: {
                farmerId: user.id as string,
                farmId,
                preferredDate: new Date(preferredDate),
                preferredSlot,
                status: 'REQUESTED'
            }
        })

        return NextResponse.json({ booking })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

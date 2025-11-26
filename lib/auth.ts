import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import prisma from '@/lib/prisma'

export async function getCurrentUser() {
    const token = (await cookies()).get('token')?.value
    if (!token) return null

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret')
        const { payload } = await jwtVerify(token, secret)

        // Verify user still exists in DB
        const user = await prisma.user.findUnique({
            where: { id: payload.id as string }
        })

        if (!user) return null
        return user
    } catch {
        return null
    }
}

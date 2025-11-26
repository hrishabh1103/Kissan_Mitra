'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LogoutButton({ variant = 'default' }: { variant?: 'default' | 'ghost' }) {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/auth/login')
            router.refresh()
            toast.success('Logged out')
        } catch (error) {
            toast.error('Failed to logout')
        }
    }

    if (variant === 'ghost') {
        return (
            <button onClick={handleLogout} className="text-stone-600 hover:text-red-600">
                <LogOut className="h-5 w-5" />
            </button>
        )
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors w-full text-left"
        >
            <LogOut className="h-5 w-5" />
            Logout
        </button>
    )
}

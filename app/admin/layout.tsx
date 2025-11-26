import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
        redirect('/auth/login')
    }

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-stone-900 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-stone-800">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <span className="bg-white text-stone-900 p-1 rounded">KM</span>
                        Admin
                    </h1>
                    <p className="text-stone-400 text-sm mt-2">Welcome, {user.name}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                </nav>
                <div className="p-4 border-t border-stone-800">
                    <LogoutButton />
                </div>
            </aside>

            {/* Mobile Header & Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
                    <span className="font-bold text-stone-800">KisanMitra Admin</span>
                    <LogoutButton variant="ghost" />
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

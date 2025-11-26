import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Tractor, LogOut, PlusCircle, Calendar } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton' // We need to create this

export default async function FarmerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()
    if (!user || user.role !== 'FARMER') {
        redirect('/auth/login')
    }

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-green-800 text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-green-700">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <span className="bg-white text-green-800 p-1 rounded">KM</span>
                        Farmer
                    </h1>
                    <p className="text-green-200 text-sm mt-2">Welcome, {user.name}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/farmer" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/farmer/farms/new" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        <PlusCircle className="h-5 w-5" />
                        Add Farm
                    </Link>
                    <Link href="/farmer/book/new" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        <Calendar className="h-5 w-5" />
                        Book Collection
                    </Link>
                </nav>
                <div className="p-4 border-t border-green-700">
                    <LogoutButton />
                </div>
            </aside>

            {/* Mobile Header & Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
                    <span className="font-bold text-stone-800">KisanMitra Farmer</span>
                    <LogoutButton variant="ghost" />
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

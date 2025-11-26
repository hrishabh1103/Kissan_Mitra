import Link from 'next/link'
import { Leaf, Tractor } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="bg-green-600 p-2 rounded-full flex items-center justify-center">
                                <Leaf className="h-6 w-6 text-white" />
                            </span>
                            <span className="text-xl font-bold text-stone-800">KisanMitra</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/#mission" className="text-stone-600 hover:text-green-700 font-medium transition-colors">
                            Our Mission
                        </Link>
                        <Link href="/#impact" className="text-stone-600 hover:text-green-700 font-medium transition-colors">
                            Impact
                        </Link>
                        <div className="flex items-center gap-3 ml-4">
                            <Link
                                href="/auth/login?role=farmer"
                                className="px-4 py-2 rounded-full text-green-700 bg-green-50 hover:bg-green-100 font-medium transition-colors border border-green-200"
                            >
                                Farmer Login
                            </Link>
                            <Link
                                href="/auth/login?role=owner"
                                className="px-4 py-2 rounded-full text-white bg-stone-800 hover:bg-stone-900 font-medium transition-colors flex items-center gap-2"
                            >
                                <Tractor className="h-4 w-4" />
                                Machine Owner
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

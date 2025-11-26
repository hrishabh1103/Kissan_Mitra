import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Calendar, MapPin } from 'lucide-react'
import { Booking, Farm, Machine } from '@prisma/client'

type BookingWithDetails = Booking & {
    farm: Farm
    machine: Machine | null
}

export default async function FarmerDashboard() {
    const user = await getCurrentUser()
    if (!user) return null

    const farms = await prisma.farm.findMany({
        where: { farmerId: user.id },
        orderBy: { createdAt: 'desc' }
    })

    const bookings = await prisma.booking.findMany({
        where: { farmerId: user.id },
        include: { farm: true, machine: true },
        orderBy: { createdAt: 'desc' }
    }) as BookingWithDetails[]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-stone-800">Dashboard</h1>
                <p className="text-stone-600">Manage your farms and stubble collection requests.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Total Farms</h3>
                    <p className="text-3xl font-bold text-stone-800 mt-2">{farms.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Active Requests</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Completed Collections</h3>
                    <p className="text-3xl font-bold text-stone-800 mt-2">
                        {bookings.filter((b) => b.status === 'COMPLETED').length}
                    </p>
                </div>
            </div>

            {/* Farms Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-stone-800">My Farms</h2>
                    <Link href="/farmer/farms/new" className="flex items-center gap-2 text-sm font-medium text-green-700 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Farm
                    </Link>
                </div>
                {farms.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-dashed border-stone-300 text-center">
                        <p className="text-stone-500 mb-4">You haven't added any farms yet.</p>
                        <Link href="/farmer/farms/new" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Add Your First Farm
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {farms.map((farm) => (
                            <div key={farm.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-stone-800">{farm.location}</h3>
                                        <p className="text-sm text-stone-500">{farm.cropType}</p>
                                    </div>
                                    <MapPin className="h-5 w-5 text-stone-400" />
                                </div>
                                <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-stone-600">{farm.landArea} Acres</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bookings Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-stone-800">Collection Requests</h2>
                    <Link href="/farmer/book/new" className="flex items-center gap-2 text-sm font-medium text-green-700 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                        <Calendar className="h-4 w-4" />
                        New Request
                    </Link>
                </div>
                {bookings.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-dashed border-stone-300 text-center">
                        <p className="text-stone-500">No collection requests found.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-stone-200">
                            <thead className="bg-stone-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Farm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date & Slot</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Machine</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-stone-200">
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                                            {booking.farm.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            <div className="flex flex-col">
                                                <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                                                <span className="text-xs text-stone-400">{booking.preferredSlot}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'REQUESTED' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                                                        booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                            {booking.machine ? booking.machine.type : 'Pending Assignment'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

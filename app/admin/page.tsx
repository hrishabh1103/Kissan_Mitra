import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'
import BookingAssignment from '@/components/BookingAssignment'
import { Booking, Farm, Machine, User } from '@prisma/client'

type BookingWithDetails = Booking & {
    farm: Farm
    machine: (Machine & { owner: User }) | null
    farmer: User
}

export default async function AdminDashboard() {
    const user = await getCurrentUser()
    if (!user) return null

    const bookings = await prisma.booking.findMany({
        include: {
            farm: true,
            machine: { include: { owner: true } },
            farmer: true
        },
        orderBy: { createdAt: 'desc' }
    }) as BookingWithDetails[]

    const machines = await prisma.machine.findMany({
        include: { owner: true }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-stone-800">Admin Dashboard</h1>
                <p className="text-stone-600">Overview of all requests and assignments.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Total Requests</h3>
                    <p className="text-3xl font-bold text-stone-800 mt-2">{bookings.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Pending Assignment</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {bookings.filter((b) => b.status === 'REQUESTED').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h3 className="text-stone-500 text-sm font-medium">Available Machines</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {machines.length}
                    </p>
                </div>
            </div>

            {/* All Bookings Section */}
            <div>
                <h2 className="text-xl font-bold text-stone-800 mb-4">All Collection Requests</h2>
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-stone-200">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Farmer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date & Slot</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Assign Machine</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-stone-200">
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                                        {booking.farmer.name}
                                        <div className="text-xs text-stone-500">{booking.farmer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                        {booking.farm.location}
                                        <div className="text-xs text-stone-400">{booking.farm.landArea} Acres</div>
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
                                        <BookingAssignment booking={booking} machines={machines} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

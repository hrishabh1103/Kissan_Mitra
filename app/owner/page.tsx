import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Tractor } from 'lucide-react'
import { Booking, Farm, Machine, User } from '@prisma/client'

type BookingWithDetails = Booking & {
  farm: Farm
  machine: Machine | null
  farmer: User
}

export default async function OwnerDashboard() {
  const user = await getCurrentUser()
  if (!user) return null

  const machines = await prisma.machine.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  // Find bookings assigned to any of the owner's machines
  const machineIds = machines.map((m) => m.id)
  const bookings = await prisma.booking.findMany({
    where: { machineId: { in: machineIds } },
    include: { farm: true, machine: true, farmer: true },
    orderBy: { createdAt: 'desc' }
  }) as BookingWithDetails[]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-600">Manage your machines and view assigned tasks.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-stone-500 text-sm font-medium">Total Machines</h3>
          <p className="text-3xl font-bold text-stone-800 mt-2">{machines.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-stone-500 text-sm font-medium">Assigned Tasks</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {bookings.filter((b) => b.status === 'ASSIGNED').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-stone-500 text-sm font-medium">Completed Tasks</h3>
          <p className="text-3xl font-bold text-stone-800 mt-2">
            {bookings.filter((b) => b.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Machines Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-stone-800">My Machinery</h2>
          <Link href="/owner/machines/new" className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:bg-stone-100 px-3 py-2 rounded-lg transition-colors">
            <Plus className="h-4 w-4" />
            Add Machine
          </Link>
        </div>
        {machines.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-dashed border-stone-300 text-center">
            <p className="text-stone-500 mb-4">You haven't listed any machines yet.</p>
            <Link href="/owner/machines/new" className="inline-flex items-center px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900">
              List Your First Machine
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <div key={machine.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-stone-800">{machine.type}</h3>
                    <p className="text-sm text-stone-500">{machine.availability}</p>
                  </div>
                  <Tractor className="h-5 w-5 text-stone-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assigned Bookings Section */}
      <div>
        <h2 className="text-xl font-bold text-stone-800 mb-4">Assigned Tasks</h2>
        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-dashed border-stone-300 text-center">
            <p className="text-stone-500">No tasks assigned yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Date & Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Machine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                      <div className="flex flex-col">
                        <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                        <span className="text-xs text-stone-400">{booking.preferredSlot}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                      {booking.machine?.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'}`}>
                        {booking.status}
                      </span>
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

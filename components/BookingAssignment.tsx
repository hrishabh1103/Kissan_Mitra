'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function BookingAssignment({ booking, machines }: { booking: any, machines: any[] }) {
    const [selectedMachine, setSelectedMachine] = useState(booking.machineId || '')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleAssign = async () => {
        if (!selectedMachine) return
        setIsLoading(true)
        try {
            const res = await fetch(`/api/bookings/${booking.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ machineId: selectedMachine })
            })

            if (!res.ok) throw new Error('Failed to assign machine')

            toast.success('Machine assigned successfully')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
        return <span className="text-sm text-stone-500">{booking.machine ? booking.machine.type : 'No machine'}</span>
    }

    return (
        <div className="flex items-center gap-2">
            <select
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
                className="block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-xs px-2 py-1 border"
                disabled={isLoading}
            >
                <option value="">Select Machine</option>
                {machines.map(machine => (
                    <option key={machine.id} value={machine.id}>
                        {machine.type} ({machine.owner.name})
                    </option>
                ))}
            </select>
            <button
                onClick={handleAssign}
                disabled={isLoading || !selectedMachine || selectedMachine === booking.machineId}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="animate-spin h-3 w-3" /> : 'Assign'}
            </button>
        </div>
    )
}

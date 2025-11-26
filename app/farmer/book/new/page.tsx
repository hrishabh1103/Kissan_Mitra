'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BookCollectionPage() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [farms, setFarms] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        fetch('/api/farms').then(res => res.json()).then(data => {
            if (data.farms) setFarms(data.farms)
        })
    }, [])

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to book collection')

            toast.success('Collection requested successfully')
            router.push('/farmer')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/farmer" className="text-stone-500 hover:text-stone-700 flex items-center gap-2 mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-stone-800">Book Stubble Collection</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Select Farm</label>
                        <select
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('farmId', { required: true })}
                        >
                            <option value="">Select a farm...</option>
                            {farms.map(farm => (
                                <option key={farm.id} value={farm.id}>{farm.location} ({farm.cropType})</option>
                            ))}
                        </select>
                        {farms.length === 0 && (
                            <p className="mt-2 text-sm text-red-500">
                                You need to <Link href="/farmer/farms/new" className="underline">add a farm</Link> first.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700">Preferred Date</label>
                        <input
                            type="date"
                            required
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('preferredDate', { required: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700">Preferred Time Slot</label>
                        <select
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('preferredSlot', { required: true })}
                        >
                            <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                            <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading || farms.length === 0}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Request Collection'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

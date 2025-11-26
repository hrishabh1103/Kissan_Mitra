'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddFarmPage() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/farms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to add farm')

            toast.success('Farm added successfully')
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
                <h1 className="text-2xl font-bold text-stone-800">Add New Farm Details</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Location / Village Name</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('location', { required: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700">Crop Type</label>
                        <select
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('cropType', { required: true })}
                        >
                            <option value="Rice/Paddy">Rice/Paddy</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Sugarcane">Sugarcane</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700">Land Area (in Acres)</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                            {...register('landArea', { required: true })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save Farm Details'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

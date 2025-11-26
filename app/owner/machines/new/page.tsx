'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddMachinePage() {
    const { register, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/machines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to add machine')

            toast.success('Machine listed successfully')
            router.push('/owner')
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
                <Link href="/owner" className="text-stone-500 hover:text-stone-700 flex items-center gap-2 mb-4">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-stone-800">List New Machinery</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-stone-700">Machine Type</label>
                        <select
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-3 py-2 border"
                            {...register('type', { required: true })}
                        >
                            <option value="Happy Seeder">Happy Seeder</option>
                            <option value="Super Seeder">Super Seeder</option>
                            <option value="Rotavator">Rotavator</option>
                            <option value="Baler">Baler</option>
                            <option value="Mulcher">Mulcher</option>
                            <option value="Tractor">Tractor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700">Availability / Description</label>
                        <textarea
                            rows={3}
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g. Available on weekends, covers 50km radius"
                            {...register('availability', { required: true })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'List Machine'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

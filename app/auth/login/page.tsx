'use client'

import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const role = searchParams.get('role') || 'farmer'

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Login failed')
            }

            toast.success('Logged in successfully')

            if (result.user.role === 'FARMER') {
                router.push('/farmer')
            } else if (result.user.role === 'OWNER') {
                router.push('/owner')
            } else if (result.user.role === 'ADMIN') {
                router.push('/admin')
            } else {
                router.push('/')
            }

            router.refresh()
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
                <h2 className="text-center text-3xl font-extrabold text-stone-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-stone-600">
                    Or{' '}
                    <Link href={`/auth/signup?role=${role}`} className="font-medium text-green-600 hover:text-green-500">
                        create a new account
                    </Link>
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-stone-700">
                        Email address or Phone
                    </label>
                    <div className="mt-1">
                        <input
                            id="identifier"
                            type="text"
                            autoComplete="username"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('identifier', { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('password', { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

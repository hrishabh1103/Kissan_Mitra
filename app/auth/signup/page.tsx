'use client'

import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function SignupForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const roleParam = searchParams.get('role')

    // Normalize role to uppercase for backend
    const defaultRole = roleParam ? (roleParam === 'owner' ? 'OWNER' : 'FARMER') : 'FARMER'

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Signup failed')
            }

            toast.success('Account created successfully')

            if (result.user.role === 'FARMER') {
                router.push('/farmer')
            } else if (result.user.role === 'OWNER') {
                router.push('/owner')
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
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-stone-600">
                    Or{' '}
                    <Link href="/auth/login" className="font-medium text-green-600 hover:text-green-500">
                        sign in to existing account
                    </Link>
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                        Full Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('name', { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('email', { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                        Phone Number
                    </label>
                    <div className="mt-1">
                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('phone', { required: true })}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-stone-700">
                        I am a
                    </label>
                    <div className="mt-1">
                        <select
                            id="role"
                            defaultValue={defaultRole}
                            className="block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            {...register('role', { required: true })}
                        >
                            <option value="FARMER">Farmer</option>
                            <option value="OWNER">Machine Owner</option>
                        </select>
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
                            required
                            className="appearance-none block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            {...register('password', { required: true, minLength: 6 })}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign up'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    )
}

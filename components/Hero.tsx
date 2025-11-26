import Link from 'next/link'
import { ArrowRight, Sprout, Tractor, Leaf } from 'lucide-react'

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-stone-50 pt-16 pb-32 lg:pt-24 lg:pb-40">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
                            <Sprout className="h-4 w-4 mr-2" />
                            Stop Stubble Burning Today
                        </div>
                        <h1 className="text-4xl tracking-tight font-extrabold text-stone-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                            <span className="block">Turn Farm Residue</span>
                            <span className="block text-green-700">Into Opportunity</span>
                        </h1>
                        <p className="mt-3 text-base text-stone-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Join the movement to eliminate stubble burning. We help farmers dispose of crop residue for free by connecting them with machine owners who turn it into eco-friendly products.
                        </p>
                        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Link
                                    href="/auth/signup?role=farmer"
                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-green-200"
                                >
                                    I am a Farmer
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/auth/signup?role=owner"
                                    className="flex items-center justify-center px-8 py-3 border border-stone-300 text-base font-medium rounded-xl text-stone-700 bg-white hover:bg-stone-50 md:py-4 md:text-lg md:px-10 transition-all"
                                >
                                    <Tractor className="mr-2 h-5 w-5" />
                                    Machine Owner
                                </Link>
                            </div>
                            <p className="mt-4 text-sm text-stone-500">
                                Already have an account? <Link href="/auth/login" className="font-medium text-green-700 hover:underline">Log in here</Link>
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
                            <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                                <div className="aspect-w-16 aspect-h-9 bg-green-100 h-96 flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
                                        alt="Sustainable Farming"
                                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-stone-900/40"></div>
                                    <div className="relative z-10 text-center p-8">
                                        <div className="w-32 h-32 bg-green-600/90 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-bounce-slow border-4 border-white/20">
                                            <Leaf className="h-16 w-16 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Eco-Friendly Cycle</h3>
                                        <p className="text-stone-100 drop-shadow-md font-medium">From waste to wealth. Your stubble becomes biodegradable cutlery.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

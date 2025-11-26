import { CheckCircle2, TrendingUp, Users, Wind } from 'lucide-react'

const stats = [
    { name: 'Farmers Helped', value: '2,000+', icon: Users },
    { name: 'Acres Saved', value: '15,000+', icon: CheckCircle2 },
    { name: 'Carbon Reduced', value: '500 Tons', icon: Wind },
    { name: 'Machines Active', value: '150+', icon: TrendingUp },
]

export default function Showcase() {
    return (
        <div className="bg-white py-24 sm:py-32" id="impact">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                            Making a Real Impact
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-stone-600">
                            Together we are transforming agriculture and saving the environment, one acre at a time.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col bg-stone-50/50 p-8 hover:bg-green-50 transition-colors duration-300">
                                <dt className="text-sm font-semibold leading-6 text-stone-600 flex items-center justify-center gap-2">
                                    <stat.icon className="h-5 w-5 text-green-600" />
                                    {stat.name}
                                </dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            <div className="mt-32 overflow-hidden sm:mt-40">
                <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                        <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">From Waste to Wealth</h2>
                            <p className="mt-6 text-xl leading-8 text-stone-600">
                                Instead of burning stubble and polluting the air, our farmers are turning crop residue into valuable resources.
                            </p>
                            <p className="mt-6 text-base leading-7 text-stone-600">
                                The straw is collected and processed into biodegradable cutlery, packaging materials, and even bio-fuel. This not only prevents smog but also creates a new income stream for our farming communities.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                <div className="relative aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-stone-200 object-cover shadow-2xl flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=800&auto=format&fit=crop"
                                        alt="Biodegradable cutlery"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                    <div className="relative aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-green-100 object-cover shadow-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
                                            alt="Clean green fields"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                    <div className="relative aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-stone-200 object-cover shadow-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1722586663795-f93b06500b9e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xlYXIlMjBibHVlJTIwc2t5fGVufDB8fDB8fHww"
                                            alt="Reduced pollution - Clear Blue Sky"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                    <div className="relative aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-green-100 object-cover shadow-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1609252509027-3928a66302fd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZmFybWVyfGVufDB8fDB8fHww"
                                            alt="Happy Indian Farmer"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
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

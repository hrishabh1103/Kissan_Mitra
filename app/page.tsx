import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <Showcase />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 KisanMitra. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

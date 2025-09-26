import Hero from '@/components/sections/Hero'
import FeaturedTreks from '@/components/sections/FeaturedTreks'
import Features from '@/components/sections/Features'
import Newsletter from '@/components/sections/Newsletter'
 

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedTreks />
      <Features />
      <Newsletter />
    </main>
  )
}

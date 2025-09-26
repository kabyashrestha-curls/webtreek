import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AIChatbox from '@/components/layout/AIChatbox'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trekking Adventures - Explore the World',
  description: 'Discover amazing trekking adventures around the world. Book guided treks, explore beautiful trails, and create unforgettable memories.',
  keywords: 'trekking, hiking, adventure, outdoor, guided tours, mountains, trails',
  authors: [{ name: 'Trekking Adventures Team' }],
  openGraph: {
    title: 'Trekking Adventures - Explore the World',
    description: 'Discover amazing trekking adventures around the world. Book guided treks, explore beautiful trails, and create unforgettable memories.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
          <AIChatbox />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}

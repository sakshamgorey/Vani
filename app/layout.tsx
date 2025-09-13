import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vani – Writing Style Profiler',
  description: 'Analyze writing style using AI-powered literary analysis',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} font-mono h-full antialiased`}>
        <div className="min-h-full flex flex-col relative z-10 p-4 sm:p-6 lg:p-8">
          <main className="flex-1 max-w-8xl mx-auto w-full">
            {children}
          </main>
         
        </div>
        <Toaster />
      </body>
    </html>
  )
}

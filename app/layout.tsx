import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter, Space_Grotesk,} from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets:['latin'], weight:['300','400','500','600','700']
})

export const metadata: Metadata = {
  title: 'Get Price',
  description: 'Save effortlessly: track prices, use tools, and grab discounts for the best online deals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <main className="max-w-10Xl mx-auto">
        <Navbar/>
       {children}
       </main>
        
        </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartWeb — Selected Digital Products',
  description: 'Selected product, UX, AI and technology work by SmartWeb.',
  metadataBase: new URL('https://popnegro-portfolio.vercel.app'),
  openGraph: { title: 'SmartWeb — Selected Digital Products', description: 'Product, UX, AI and technology.', type: 'website', url: 'https://popnegro-portfolio.vercel.app', siteName: 'SmartWeb' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}

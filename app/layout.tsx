import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://popnegro-portfolio-popnegros-projects.vercel.app'

export const metadata: Metadata = {
  title: 'Luis Grasso — Digital Product Design',
  description: 'Luis Grasso — 15+ years evolving from visual communication and web design into digital products, UX, technology and AI.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Luis Grasso — Digital Product Design',
    description: '15+ years from design to digital products.',
    type: 'website',
    url: siteUrl,
    siteName: 'Luis Grasso',
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}

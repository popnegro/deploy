import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://popnegro-portfolio-git-feat-porfolio-popnegros-projects.vercel.app'
const title = 'Luis Grasso — Digital Product Design, UX/UI & Web'
const description = 'Luis Grasso es diseñador y constructor de productos digitales en Mendoza, Argentina. Más de 15 años de experiencia en diseño gráfico, branding, campañas digitales, UX/UI, web, marketing y tecnología.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  applicationName: 'Luis Grasso Portfolio',
  authors: [{ name: 'Luis Grasso', url: 'https://www.linkedin.com/in/luis-grasso' }],
  creator: 'Luis Grasso',
  publisher: 'Luis Grasso',
  keywords: [
    'Luis Grasso', 'diseñador digital', 'diseñador UX UI', 'product designer',
    'diseño web', 'diseño de producto', 'branding', 'marketing digital',
    'desarrollo web', 'Mendoza', 'Argentina'
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: siteUrl,
    siteName: 'Luis Grasso',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luis Grasso',
  jobTitle: 'Digital Product Designer',
  description,
  url: siteUrl,
  email: 'mailto:grasso.luis@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Mendoza', addressCountry: 'AR' },
  sameAs: [
    'https://www.linkedin.com/in/luis-grasso',
    'https://github.com/popnegro',
  ],
  knowsAbout: [
    'Digital Product Design', 'UX/UI', 'Web Design', 'Branding',
    'Digital Marketing', 'SaaS', 'Artificial Intelligence'
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-AR"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} /></body></html>
}

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vinicius Lago Cruz — Backend / Full Stack Developer',
  description: 'Portfólio de Vinicius Lago Cruz, Desenvolvedor Backend e Full Stack com 4+ anos de experiência em Java, Spring Boot, PHP, Laravel e Next.js.',
  openGraph: {
    title: 'Vinicius Lago Cruz — Backend / Full Stack Developer',
    description: 'Java, Spring Boot, PHP, Laravel, Next.js · 4+ anos em TI · 4 sistemas em produção',
    url: 'https://viniciuslago.vercel.app',
    siteName: 'Vinicius Lago Cruz',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

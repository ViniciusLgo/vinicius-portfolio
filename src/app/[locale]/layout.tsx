import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'
import MatrixRain from '@/components/MatrixRain'
import PageTransition from '@/components/PageTransition'
import ClickBurst from '@/components/ClickBurst'
import SecretWord from '@/components/SecretWord'
import EasterEggsPanel from '@/components/EasterEggsPanel'
import CursorSpotlight from '@/components/CursorSpotlight'
import Aurora from '@/components/Aurora'
import CommandPalette from '@/components/CommandPalette'
import ToastContainer from '@/components/Toast'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isEn = locale === 'en'
  const title = isEn
    ? 'Vinicius Lago Cruz — Backend / Full Stack Developer'
    : 'Vinicius Lago Cruz — Desenvolvedor Backend / Full Stack'
  const description = isEn
    ? 'Portfolio of Vinicius Lago Cruz, Backend and Full Stack Developer with 4+ years of experience in Java, Spring Boot, PHP, Laravel and Next.js.'
    : 'Portfólio de Vinicius Lago Cruz, Desenvolvedor Backend e Full Stack com 4+ anos de experiência em Java, Spring Boot, PHP, Laravel e Next.js.'
  const ogDescription = isEn
    ? 'Java, Spring Boot, PHP, Laravel, Next.js · 4+ years in IT · 4 systems in production'
    : 'Java, Spring Boot, PHP, Laravel, Next.js · 4+ anos em TI · 4 sistemas em produção'

  return {
    title,
    description,
    metadataBase: new URL('https://viniciuslago.vercel.app'),
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      title,
      description: ogDescription,
      url: `https://viniciuslago.vercel.app/${locale}`,
      siteName: 'Vinicius Lago Cruz',
      locale: isEn ? 'en_US' : 'pt_BR',
      type: 'website',
    },
  }
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Aurora />
          <CursorSpotlight />
          <CommandPalette />
          <ToastContainer />
          <CustomCursor />
          <LoadingScreen />
          <MatrixRain />
          <ClickBurst />
          <SecretWord />
          <ScrollProgress />
          <NavBar />
          <PageTransition>
            {children}
          </PageTransition>
          <EasterEggsPanel />
          <BackToTop />
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pt'],
  defaultLocale: 'pt',
})

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}

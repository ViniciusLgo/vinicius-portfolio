import { getRequestConfig } from 'next-intl/server'

const locales = ['pt', 'en']

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const validLocale = requested && locales.includes(requested) ? requested : 'pt'
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  }
})

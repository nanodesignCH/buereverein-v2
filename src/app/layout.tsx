import type { Metadata } from 'next'
import { clashDisplay, satoshi } from './fonts'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'BÜREVEREIN',
  description:
    'Der BÜREVEREIN bringt Menschen zusammen, fördert das soziale Miteinander und unterstützt Projekte, die unserer Region zugutekommen.',
}

/* Markup structure per DESIGN.md 5. Everything with position fixed, the header
   above all, sits outside #smooth-wrapper. */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-pill)] focus:bg-[var(--color-ink)] focus:px-5 focus:py-3 focus:text-[var(--color-paper)]"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <SmoothScrollProvider>
          {children}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

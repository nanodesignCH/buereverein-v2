import Link from 'next/link'
import { footer, nav } from '@/data/site'
import { Divider } from '@/components/ui/Divider'

/* Inline SVG, single colour in currentColor, no icon library and no colour.
   The target addresses are not known yet, so both links stay inert. */
const socialPaths: Record<string, string> = {
  Instagram:
    'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.82.9 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.9 3.9 0 0 1-.9 1.4c-.42.43-.82.7-1.4.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.48-1 .9-1.4.42-.43.82-.7 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 2.3a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm6.9-2.6a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z',
  Facebook:
    'M13.5 21.9V13.6h2.8l.42-3.25H13.5V8.27c0-.94.26-1.58 1.6-1.58h1.72V3.78c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3v2.4H7.33v3.25h2.81v8.3h3.36Z',
}

export function SiteFooter() {
  return (
    <footer className="px-[var(--inset)] pb-[var(--inset)] pt-[var(--section-gap)]">
      <Divider />
      <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 pt-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-display-m)] font-medium leading-[0.95] tracking-[-0.02em]">
            {footer.verein}
          </p>
          <address className="mt-5 not-italic">
            {footer.adresse.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href={`mailto:${footer.mail}`} className="mt-2 inline-block text-[var(--color-ink)] underline underline-offset-4">
              {footer.mail}
            </a>
          </address>
        </div>

        <nav aria-label="Fussnavigation" className="col-span-6 lg:col-span-3">
          <p className="caption">Seiten</p>
          <ul className="mt-5 list-none space-y-2 p-0">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--color-ink)] no-underline hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 lg:col-span-2">
          <p className="caption">Rechtliches</p>
          <ul className="mt-5 list-none space-y-2 p-0">
            {footer.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[var(--color-ink)] no-underline hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-2">
          <p className="caption">Folgen</p>
          <ul className="mt-5 flex list-none gap-3 p-0">
            {footer.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  aria-label={item.name}
                  className="grid size-11 place-items-center rounded-full border border-[var(--color-ink)] text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
                    <path d={socialPaths[item.name] ?? ''} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

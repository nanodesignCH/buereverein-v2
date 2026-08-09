import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* A stray lockfile in the home directory otherwise makes Next pick the wrong
     workspace root. */
  outputFileTracingRoot: __dirname,
}

export default nextConfig

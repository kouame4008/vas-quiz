/** @type {import('next').NextConfig} */

const path = require('path')

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  distDir: 'build',
  images: {
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // loader: 'imgix',
    // path: '/',
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth',
  //       permanent: false,
  //       basePath: false
  //     },
  //   ]
  // },
}

module.exports = withPWA(nextConfig)

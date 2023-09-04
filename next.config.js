/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/before',
          destination: '/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/after',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/fallback/:path*',
          destination: `https://my-old-site.com/:path*`,
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/bar',
        destination: '/foos',
        permanent: true,
      },
      {
        source: '/foo',
        destination: '/foos',
        permanent: false,
      },
      {
        source: '/foopath/:path*',
        destination: '/foos/:path*',
        permanent: false
      },
      {
        source: '/fooquery',
        has: [
          {
            type: 'query',
            key: 'page',
            // the page value will not be available in the
            // destination since value is provided and doesn't
            // use a named capture group e.g. (?<page>home)
            value: 'home',
          },
        ],
        permanent: false,
        destination: '/foos',
      },
      {
        source: '/foonoredirect',
        missing: [
          {
            type: 'header',
            key: 'x-do-not-redirect',
          },
        ],
        permanent: false,
        destination: '/foos',
      },
    ]
  },
  // output: 'standalone',
  async headers() {
    return [
      {
        source: '/foo',
        headers: [
          {
            key: 'x-foo',
            value: 'some-foo',
          },
          {
            key: 'x-bar',
            value: 'some-bar',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

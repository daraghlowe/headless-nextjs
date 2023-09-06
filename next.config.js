/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/docs',
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/before',
          destination: 'https://test.com/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
          basePath: false,
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/after',
          destination: 'https://test.com/somewhere-else',
          basePath: false,
        },
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: '/fallback/:path*',
          destination: `https://my-old-site.com/:path*`,
          basePath: false,
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
        basePath: false,
      },
      {
        source: '/foo',
        destination: '/foos',
        permanent: false,
        basePath: false,
      },
      {
        source: '/foopath/:path*',
        destination: '/foos/:path*',
        permanent: false,
        basePath: false,
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
        basePath: false,
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
        basePath: false,
      },
      {
        source: '/foobase',
        destination: '/foos',
        permanent: false,
        basePath: true,
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
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'x-using',
            value: 'faust',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

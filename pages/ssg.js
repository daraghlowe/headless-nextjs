import Head from 'next/head'

export default function Home({preview}) {
  return (
    <div className="container">
      <Head>
        <title>SSG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          ● (SSG) Server Side Generated page {preview}
        </h1>
        <p>Visit <a href="/api/preview">/api/preview</a> to enable and <a href="/api/clear-preview">/api/clear-preview</a> to disable preview mode</p>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  let preview = "(preview mode disabled)"

  if (context.preview) {
    preview = "(preview mode enabled)"
  }

  return {
    props: {
      "preview": preview,
    },
  }
}

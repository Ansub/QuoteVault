import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        {/** Meta Data */}
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Elevate your thoughts, Inspire the World."
        />
        <meta property="og:site_name" content="quote-vault.vercel.app" />
        <meta
          property="og:description"
          content="Elevate your thoughts, Inspire the World."
        />
        <meta property="og:title" content="Quote Vault" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quote Vault" />
        <meta
          name="twitter:description"
          content="Elevate your thoughts, Inspire the World."
        />
        <meta
          property="og:image"
          content="https://quote-vault.vercel.app/images/quotevault.png"
        />
        <meta
          name="twitter:image"
          content="https://quote-vault.vercel.app/images/quotevault.png"
        />

        {/** Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

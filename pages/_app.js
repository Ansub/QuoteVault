import "../styles/globals.css"
import Layout from "../components/layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Quote Vault</title>
        <meta
          name="description"
          content="A Mini Social Media App for Sharing Quotes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

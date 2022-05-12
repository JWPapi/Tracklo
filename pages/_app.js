import '../styles/globals.css'
import 'ag-grid-enterprise'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Layout from '../layout/Layout'

export default function App({ Component, pageProps : { session, ...pageProps } }) {
    return (
    <SessionProvider session={session}>
        <Head>
            <title>Exalting Dashboard</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Layout>
            <Component  {...pageProps} />
        </Layout>
    </SessionProvider>
    )
}


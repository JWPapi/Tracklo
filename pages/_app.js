import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../layout/layout'
import 'ag-grid-enterprise'
import { SessionProvider, useSession } from 'next-auth/react'


export default function App({ Component, pageProps: { session, ...pageProps} }) {

    return (
    <SessionProvider session={session}>
        <Head>
            <title>Exalting Dashboard</title>
            <link rel="icon"
                  href="/favicon.ico"/>
        </Head>
        <Layout>
            <Component  {...pageProps} />
        </Layout>
    </SessionProvider>
    )
}


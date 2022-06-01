import '../styles/globals.css'
import 'ag-grid-enterprise'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Layout from '../layout/Layout'

export default function App({ Component, pageProps : { session, ...pageProps } }) {
    const getLayout = ({ Component }) => {
        if (Component.noDrawer) return <Component {...pageProps} />
        return ( <Layout> <Component {...pageProps} /> </Layout> )
    }
    return (
    <SessionProvider session={session}>
        <Head>
        <title>Tracklo.io – Track with Confidence</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
        {getLayout({ Component })}
    </SessionProvider>
    )
}


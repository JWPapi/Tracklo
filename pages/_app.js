import '../styles/globals.css'
import 'ag-grid-enterprise'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Layout from '../layout/Layout'

export default function App({ Component, pageProps : { session, ...pageProps } }) {
    //ToDo: upload new favicon
    const getLayout = ({ Component }) => {
        if (Component.noDrawer) return <Component {...pageProps} />
        return ( <Layout> <Component {...pageProps} /> </Layout> )
    }

    if (Component.noLogin) return ( <>
        <Header/> {getLayout({ Component })}
    </> )

    return (
    <SessionProvider session={session}>
        <Header/> {getLayout({ Component })}
    </SessionProvider>
    )

}

const Header = () => {
    return (
    <Head>
        <title>Tracklo.io – Track with Confidence</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
    )
}


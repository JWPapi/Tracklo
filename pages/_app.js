import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../layout/Layout'
import 'ag-grid-enterprise'
import { SessionProvider, useSession } from 'next-auth/react'
import SessionMiddleware from '../layout/SessionMiddleware'


export default function App({ Component, pageProps: { session, ...pageProps} }) {
    return (
    <SessionProvider session={session}>
        <SessionMiddleware Component={Component} pageProps={pageProps}/>
    </SessionProvider>
    )
}


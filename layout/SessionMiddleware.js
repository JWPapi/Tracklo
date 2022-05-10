import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from './Layout.js'

export default function SessionMiddleware({ Component, pageProps }) {
    const router = useRouter()

    const { status } = useSession({
        required : true,
        onUnauthenticated() {
            router.push('/api/auth/signin')
        },
        onAuthenticated() {
            router.push('/facebook/AdsOverview')
        }
    })

    return (
    <>
        <Head>
            <title>Exalting Dashboard</title>
            <link rel="icon"
                  href="/favicon.ico"/>
        </Head>
        <Layout>
            <Component  {...pageProps} />
        </Layout>
    </>
    )
}
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Home from '../pages/facebook/adsOverview'

export default function Index({ children }) {
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

    return <Home />
}
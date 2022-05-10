import Sidebar from './Sidebar.js'
import { useSession,signIn } from 'next-auth/react'
import { useRouter } from 'next/router'


export default function Layout({ children }) {
    const router = useRouter()

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/api/auth/signin')
        },
    })
    return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-hidden">
        <Sidebar/>
        <main className="w-full bg-brand-dark-gray min-h-screen">{children}</main>
    </div>
    )
}
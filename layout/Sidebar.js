import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import logo from '../public/images/logo.png'

export default function Sidebar() {
    const { data : session, status } = useSession()
    if (status === 'unauthenticated' || status === 'loading') return <></>

    const toggleNavigation = () => {
        const nav = document.querySelector('#navigation')
        nav.classList.toggle('hidden')
    }

    return (
    <div className="drawer-side border-1 shadow-2xl flex-start flex">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
            <div className="p-8">
                <Image src={logo}/>
            </div>
            <li className="mt-8"><Link href="/adAccountOverview">Account Setup</Link></li>
            <li><Link href="/facebookOverview">Facebook Overview</Link>            </li>
            <li><Link href="/SessionOverviewPage">Session Overview</Link></li>
            <li> <div className="cursor-pointer" onClick={() => signOut()}>Sign out</div></li>
        </ul>
    </div>
    )
}


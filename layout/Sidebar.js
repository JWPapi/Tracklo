import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {
    const { data : session, status } = useSession()

    const toggleNavigation = () => {
        const nav = document.querySelector('#navigation')
        nav.classList.toggle('hidden')
    }

    return (
    <div className="drawer-side border-1 shadow-2xl flex-start flex">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <Image src={`/images/trackloLogo.png`} height="228" width="717" layout="responsive" className="mb-8"/>
            <li><Link href="/adAccountOverview">Account Setup</Link></li>
            <li><Link href="/">Facebook Overview</Link>            </li>
            <li><Link href="/sessionOverview">Session Overview</Link></li>
            <li><Link target="_blank" href="https://www.unicornads.com/">Unicorn Ads</Link></li>
            <li> <div className="cursor-pointer" onClick={() => signOut()}>Sign out</div></li>
        </ul>
    </div>
    )
}


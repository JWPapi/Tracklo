import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {
    const { data: session, status } = useSession()

    const toggleNavigation = () => {
        const nav = document.querySelector('#navigation')
        nav.classList.toggle('hidden')
    }

    return ( <>
        <div className="md:w-96 md:h-full shadow-md bg-white px-4 md:min-h-screen w-full">
            <div className="w-full h-24 border-b flex md:px-4 items-center md:mb-8" onClick={toggleNavigation}>
               <Image src="/Logo.png" width="192" height="55" objectFit="cover"  alt="Logo"/>
            </div>
            <div>Signed in as: <strong>{session?.user?.email}</strong></div>
            <ul id="navigation" className="px-4 my-8 text-center md:text-left hidden md:block">
                <li className="h-10">
                    <Link href="/adAccountOverview">Ad Account Overview</Link>
                </li>
                <li className="h-10">
                    <Link href="/">Facebook Übersicht</Link>
                </li>
                <li className="h-10">
                    <div className="cursor-pointer" onClick={() => signOut()}>Sign out</div>
                </li>
            </ul>
        </div>
    </> )
}
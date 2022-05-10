import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
    const toggleNavigation = () => {
        const nav = document.querySelector('#navigation')
        nav.classList.toggle('hidden')
    }

    return ( <>
        <div className="md:w-96 md:h-full shadow-md bg-white px-4 md:min-h-screen w-full">
            <div className="w-full h-24 border-b flex md:px-4 items-center md:mb-8" onClick={toggleNavigation}>
               <Image src="/Logo.png" width="192" height="55" objectFit="cover"  alt="Logo"/>
            </div>
            <ul id="navigation" className="px-4 my-8 text-center md:text-left hidden md:block">
                <li className="h-10">
                    <Link href="/facebook/adAccountOverview">Ad Account Overview</Link>
                </li>
                <li className="h-10">
                    <Link href="/facebook/adsOverview">Facebook Übersicht</Link>
                </li>
            </ul>
        </div>
    </> )
}
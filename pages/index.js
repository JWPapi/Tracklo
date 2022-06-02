import Image from 'next/image'
import logo from '../public/images/logo.png'
import mockup from '../public/images/mockup.png'
import Link from 'next/link'

export default function Index() {
    return (
    <>
        <Header/>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="mockup-window border bg-base-300">
                    <Image alt="mockup" src={mockup}/>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Track with Confidence</h1>
                    <p className="py-6">Since iOS 15.4 tracking has been a nightmare for marketers. What if we tell you
                                        that you still can track every single contact point of each order with all your
                                        marketing&nbsp;channels?
                    </p>
                    <p className="py-2">
                        Tracklo connects your marketing platforms with your Shopify Shop and finally gives you the peace
                        of mind to know which campaigns are working and which&nbsp;won’t.
                    </p>
                    <p className="py-6">
                        Do we really need to tell you how much 💵💵💵 this means?
                    </p>
                    <CTAButton/>
                </div>
            </div>
        </div>
    </>
    )
}

const Header = () => {
    return (
    <div className="navbar bg-base-200 justify-between p-8">
        <div className="block max-w-xs">
            <Image alt="Logo" src={logo}/>
        </div>
        <CTAButton/>
    </div>
    )
}

Index.noDrawer = function noDrawer() {
    return true
}
Index.noLogin = function noLogin() {
    return true
}

const CTAButton = () => (<Link href="/auth/signin" passHref>
    <button className="btn btn-accent text-black">Become a Beta Tester</button>
</Link>)


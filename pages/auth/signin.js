import { getProviders, signIn, getCsrfToken } from 'next-auth/react'
import Image from 'next/image'
import logo from '../../public/images/logo.png'

export default function SignIn({ csrfToken }) {
    const isDev = process.env.NODE_ENV === 'development'

    return (
    <div className="flex min-h-screen justify-center items-center flex-col ">
        <div className="w-96 mb-16">
            <Image alt="Logo" src={logo}/>
        </div>
        <div className="p-6 -mt-8" key="email">
            <form method="post" className="form-control " action="/api/auth/signin/email">
                <button className="btn bg-[#4267B2] text-white mb-16
                 " onClick={() => signIn('facebook')}>
                    Sign in with Facebook
                </button>
                {isDev && (<>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                <label className="input-group mb-4">
                    <span>Email</span>
                    <input type="email"
                           id="email"
                           name="email"
                           placeholder="info@site.com"
                           className="input input-bordered bg-white "/>
                </label>
                <button type="submit" className="btn btn-primary w-64">Sign in with Email</button>
                </>)}
            </form>
        </div>
    </div>
    )
}

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
        props : { csrfToken }
    }
}

SignIn.noDrawer = function noDrawer() {
    return true
}
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { CheckIcon } from '@heroicons/react/outline'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function ConnectForm({ adAccount }) {
    const [shopName, setShopName] = useState('')
    const [apiKey, setApiKey] = useState('')
    const [state, setState] = useState('')
    const router = useRouter()

    const onClick = async (shopName, token) => {
        setState('connecting')
        const fetchInit = {
            method  : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body    : JSON.stringify({ shopName, token, adAccount : adAccount })
        }

        const testRequest = await fetch('/api/Shopify/testShopConnection', fetchInit).then(res => res.json())
        if (testRequest.success) {
            await fetch('/api/db/postData/addAdAccountWithShop', fetchInit).then(res => res.json())
            setState('connected')
        } else setState('error')
    }

    if (state === 'connecting') {
        return (
        <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Trying to connect your shop…
            </Dialog.Title>
            <LoadingSpinner />
        </div>
        )
    }

    if (state === 'connected') {
        return (
        <>
            <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                    Shop successfully connected
                </div>
            </div>
            <div className="mt-5 sm:mt-6">
                <button type="button"
                        className="btn"
                        onClick={() => router.push('/facebook/adsOverview')}>
                    Go to the AdOverview
                </button>
            </div>
        </>
        )
    }

    return (
    <>
        <div>
            {state === 'error' && 'There was an error connecting you to your account. Please try again.'}
            <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Connect your Shopify Store
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        To display your Ads Overview based on First-Party data we need a connection
                        to your shopify store. </p>
                </div>
            </div>
        </div>
        <div className="mt-5 sm:mt-6">
            <div className="input-div">
                <label htmlFor="name" className="input-label">Your Shopify Store Name</label>
                <input type="text"
                       value={shopName}
                       onChange={(e) => setShopName(e.target.value)}
                       className="input-input"
                       placeholder="just the name not the link!"/>
            </div>
            <div className="w-100 text-center">
                <Link href="https://craftybase.com/images/blog/post/how-to-find-your-shopify-storefront-address-screenshot1.png">
                    <a target="_blank" className="text-sm mt-2 underline text-gray-500 cursor-pointer">
                        What is my Shopify Store Name?</a>
                </Link>
            </div>
            <div className="mt-8 input-div">
                <label htmlFor="name" className="input-label">Your Shopify API key</label>
                <input type="text"
                       value={apiKey}
                       onChange={(e) => setApiKey(e.target.value)}
                       className="input-input"
                       placeholder="shpat..."/>
            </div>
            <div className="w-100 text-center">
                <Link href="https://www.loom.com/share/ecec23285a6345ca9ac7c5a155178ec0">
                    <a className="text-sm  mt-2 underline text-gray-500 cursor-pointer" target="_blank">
                        How to get my Shopify API key?</a>
                </Link>
            </div>
            <button type="button"
                    disabled={!shopName || !apiKey}
                    className="mt-8 btn w-full inline-flex justify-center"
                    onClick={() => onClick(shopName, apiKey)}>
                Connect To Shopify
            </button>
        </div>
    </>
    )
}
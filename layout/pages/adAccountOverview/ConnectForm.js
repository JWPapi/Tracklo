import { Dialog } from '@headlessui/react'
import Link from 'next/link'

export default function ConnectForm({ onClick, error }) {

    return (
    <>
        <div>
            {error ? 'There was an error connecting you to your account. Please try again.' : null}
            <div id="mainMessage"
                 className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3"
                              className="text-lg leading-6 font-medium text-gray-900">
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
            <div className="relative border border-gray-300 rounded-md px-3 py-2
                                shadow-sm focus-within:ring-1 focus-within:ring-indigo-600
                                focus-within:border-indigo-600">
                <label htmlFor="name"
                       className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs
                                     font-medium text-gray-900">
                    Your Shopify Store Name
                </label>
                <input type="text"
                       name="shopifyShopName"
                       id="shopifyShopName"
                       className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500
                                           focus:ring-0 sm:text-sm"
                       placeholder="just the name not the link!"/>
            </div>
            <div className="w-100 text-center">
                <Link href="https://craftybase.com/images/blog/post/how-to-find-your-shopify-storefront-address-screenshot1.png">
                    <a target="_blank"
                       className="text-sm  mt-2 underline text-gray-500 cursor-pointer">
                        What is my Shopify Store Name?</a>
                </Link>
            </div>
            <div className="mt-8 relative border border-gray-300 rounded-md px-3 py-2
                                shadow-sm focus-within:ring-1 focus-within:ring-indigo-600
                                focus-within:border-indigo-600">
                <label htmlFor="name"
                       className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs
                                     font-medium text-gray-900">
                    Your Shopify API key
                </label>
                <input type="text"
                       name="shopifyAdminKey"
                       id="shopifyAdminKey"
                       className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500
                                           focus:ring-0 sm:text-sm"
                       placeholder="shpat..."/>
            </div>
            <div className="w-100 text-center">
                <Link href="https://www.loom.com/share/ecec23285a6345ca9ac7c5a155178ec0">
                    <a className="text-sm  mt-2 underline text-gray-500 cursor-pointer"
                       target="_blank">
                        How to get my Shopify API key?</a>
                </Link>
            </div>
            <button type="button"
                    className=" mt-8 inline-flex justify-center w-full rounded-md border
                                         border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium
                                         text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                                         focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={onClick}>
                Connect To Shopify
            </button>
        </div>
    </>
    )
}
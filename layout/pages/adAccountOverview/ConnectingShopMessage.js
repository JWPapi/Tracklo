import { Dialog } from '@headlessui/react'
import Link from 'next/link'

export default function ConnectingShopMessage() {
    return (
    <>
        <div>
            <div id="mainMessage"
                 className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3"
                              className="text-lg leading-6 font-medium text-gray-900">
                    Trying to connect your shop…
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        To display your Ads Overview based on First-Party data we need a connection
                        to your shopify store. </p>
                </div>
            </div>
        </div>

    </>
    )
}
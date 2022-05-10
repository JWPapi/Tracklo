/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ConnectForm from './ConnectForm'
import ConnectingShopMessage from './ConnectingShopMessage'
import ConnectedShopMessage from './ConnectedShopMessage'

export default function ConnectModal({ modalState, onClose, adAccount }) {
    const [state, setState] = useState(null)

    const buttonClick = async () => {
        setState('connecting')
        const shopifyAdminKey = document.getElementById('shopifyAdminKey').value
        const shopifyShopName = document.getElementById('shopifyShopName').value

        const testRequest = await fetch('/api/Shopify/testShopConnection', {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify({
                shopName : shopifyShopName,
                token    : shopifyAdminKey
            })
        })

        const testRequestResponse = await testRequest.json()


        if (testRequestResponse.success) {
            const insertData = await fetch('/api/db/postData/addAdAccountWithShop', {
                method  : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body    : JSON.stringify({
                    adAccount : adAccount,
                    token     : shopifyAdminKey,
                    shopName  : shopifyShopName
                })
            })
            await insertData.json()
            setState('connected')
        } else {
            setState('error')
        }
    }


//ToDo: CSS apply instead of those long lines
    return (
    <Transition.Root show={modalState}
                     as={Fragment}>
        <Dialog as="div"
                className="relative z-10"
                onClose={() => onClose()}>
            <Transition.Child as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true">
              &#8203;
            </span>
                    <Transition.Child as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4
                        text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm
                        sm:w-full sm:p-6">
                            {state === null ? <ConnectForm onClick={() => buttonClick()}/> : null}
                            {state === 'connecting' ? <ConnectingShopMessage/> : null}
                            {state === 'connected' ? <ConnectedShopMessage/> : null}
                            {state === 'error' ? <ConnectForm onClick={() => buttonClick()} error={true} /> : null}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
    )
}

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ConnectForm from './ConnectForm'

export default function Modal({ modalState, onClose, adAccount }) {

    return (
    <Transition.Root show={modalState} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose()}>
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
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                            <ConnectForm adAccount={adAccount} />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
    )
}

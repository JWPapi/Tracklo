import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'


export default function AdAccount({ id, name, initiallyconnected, onClick }) {
    const [justDisconnected, setJustDisconnected] = useState('no')

    const onDeleteClick = (async id => {
        setJustDisconnected('deleting')

        const disconnectCall = await fetch('/api/db/DELETE/adAccountAndShop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })

        setJustDisconnected('yes')
    })

    return <li key={id}>
        <div className="flex items-center p-8 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{id}</span>
                        </p>
                    </div>
                    <div className="flex justify-center align-items-center">
                        {(!initiallyconnected || justDisconnected === 'yes') &&
                        <button type="button" className="btn" onClick={() => onClick(id)}>Connect Shopify </button>}
                        {(initiallyconnected && justDisconnected === 'no') &&
                        <button type="button"
                                className="btn text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
                                onClick={() => onDeleteClick(id)}>Disconnect</button>}
                        {justDisconnected === 'deleting' && <LoadingSpinner />}
                    </div>
                </div>
            </div>
        </div>
    </li>
}
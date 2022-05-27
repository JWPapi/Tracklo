import { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function AdAccount({ id, name, initiallyconnected, onClick }) {
    const [justDisconnected, setJustDisconnected] = useState('no')

    const onDeleteClick = ( async id => {
        setJustDisconnected('deleting')

        await fetch('/api/db/DELETE/adAccountAndShop', {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify({
                id
            })
        })

        setJustDisconnected('yes')
    } )

    return <div className="card card-compact w-96 bg-base-100 shadow-xl m-4" key={id}>
            <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p>{id}</p>
                    <div className="card-actions justify-end">
                        {( !initiallyconnected || justDisconnected === 'yes' ) &&
                        <button type="button" className="btn btn-outline btn-success" onClick={() => onClick(id)}>Connect Shopify </button>}
                        {( initiallyconnected && justDisconnected === 'no' ) &&
                    <button type="button" className="btn btn-error" onClick={() => onDeleteClick(id)}>Disconnect</button>}
                        {justDisconnected === 'deleting' && <LoadingSpinner/>}
                    </div>
            </div>
        </div>
}
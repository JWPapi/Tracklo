import useSWR from 'swr'
import AdAccount from '../../layout/pages/adAccountOverview/AdAccount'
import Modal from '../../layout/pages/adAccountOverview/Modal'
import { useState } from 'react'
import LoadingSpinner from '../../layout/components/LoadingSpinner'

const fetcher = (...args) => fetch(...args).then(r => r.json())

export default function Component() {
    const [modalState, setModalState] = useState(false)
    const [selectedAdAccount, setSelectedAdAccount] = useState(null)
    const { data : adAccounts } = useSWR('/api/Facebook/getAdAccounts', fetcher)

    const show = (adAccount) => {
        setSelectedAdAccount(adAccount)
        setModalState(true)
    }
    const hide = () => setModalState(false)

    const listItems = adAccounts?.map(adAccount =>
    <AdAccount key={adAccount.id}
               id={adAccount.id}
               name={adAccount.name}
               onClick={show}
               connected={adAccount.connected}/>
    )

    return ( <div className="bg-white shadow overflow-hidden sm:rounded-md m-8">
        <Modal modalState={modalState}
               onClose={hide}
               adAccount={selectedAdAccount}/>
        <ul role="list"
            className="divide-y divide-gray-200">
            {listItems || <LoadingSpinner/>}
        </ul>
    </div> )

}
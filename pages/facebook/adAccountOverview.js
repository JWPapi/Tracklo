import useSWR from 'swr'
import ListItem from '../../layout/elements/ListItem'
import ConnectModal from '../../layout/components/connectModal'
import { useState } from 'react'

const fetcher = (...args) => fetch(...args).then(r => r.json())

export default function Component() {
    const [modalState, setModalState] = useState(false)
    const [selectedAdAccount, setSelectedAdAccount] = useState(null)
    const { data : adAccounts } = useSWR('/api/Facebook/getAdAccounts', fetcher)

    const show = (adAccount) => {
        setModalState(true)
        setSelectedAdAccount(adAccount)
    }
    const hide = () => setModalState(false)

    const listItems = adAccounts?.map(adAccount => {
        return ( <ListItem key={adAccount.id}
                           props={{
                               name      : adAccount.name,
                               id        : adAccount.id,
                               onClick   : () => show(adAccount.id),
                               connected : adAccount.connected
                           }}/> )
    })

    return ( <div className="bg-white shadow overflow-hidden sm:rounded-md m-8">
        <ConnectModal modalState={modalState}
                      onClose={hide}
                      adAccount={selectedAdAccount}/>
        <ul role="list"
            className="divide-y divide-gray-200">
            {listItems}
        </ul>
    </div> )

}
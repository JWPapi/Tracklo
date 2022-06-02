import useSWR from 'swr'
import AdAccount from '../layout/pages/adAccountOverview/AdAccount'
import Modal from '../layout/pages/adAccountOverview/Modal'
import { useState } from 'react'
import LoadingSpinner from '../layout/components/LoadingSpinner'
import { useSession } from 'next-auth/react'

const fetcher = (...args) => fetch(...args).then(r => r.json())

export default function Component () {
  const { data: session, status } = useSession()
  const [modalState, setModalState] = useState(false)
  const [selectedAdAccount, setSelectedAdAccount] = useState(null)
  const { data: adAccounts } = useSWR('/api/Facebook/getAdAccounts', fetcher)
  if (status === 'loading') return <LoadingSpinner/>
  if (status === 'unauthenticated') return <p>Access Denied</p>

  const show = (adAccount) => {
    setSelectedAdAccount(adAccount)
    setModalState(true)
  }

  if (adAccounts?.length === 0) return noAdAccountMessage
  if (!adAccounts) return <LoadingSpinner/>

  return (
    <div className="flex flex-wrap">
      <Modal
        modalState={modalState}
        onClose={() => setModalState(false)}
        adAccount={selectedAdAccount}/> <AdAccountList adAccounts={adAccounts} show={show}/>
    </div>
  )

}

const noAdAccountMessage = <li className="text-center p-8">Your FB Account has no access to any ad accounts</li>

const AdAccountList = ({ adAccounts, show }) => {
  return (
    <>
      {adAccounts.map(adAccount => (
        <AdAccount
          key={adAccount.id}
          id={adAccount.id}
          name={adAccount.name}
          onClick={show}
          initiallyconnected={adAccount.connected}/>
      ))}
    </>
  )
}

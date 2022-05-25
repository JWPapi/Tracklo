import useSWR from 'swr'
import { useState } from 'react'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges } from 'react-date-range'
import LoadingSpinner from '../layout/components/LoadingSpinner'
import { DateTime } from 'luxon'
import axios from 'axios'
import router from 'next/router'

const GET = (...args) => axios.get(...args).then(res => res.data)
const POST = (...args) => axios.post(...args).then(res => res.data)

export default function Home() {
    const [site, setSite] = useState(0)
    const [dateRange, setDateRange] = useState({
        startDate : new Date(),
        endDate   : new Date(),
        key       : 'selection'
    })

    //Data Calls
    const { data : adAccounts } = useSWR('/api/db/READ/connectedShops', GET)
    const validAccountsFound = adAccounts && adAccounts?.length > 0

    const { data : shopifyData } = useSWR(validAccountsFound ? [
        `/api/Shopify/getAverageSessionLength`, {
            since    : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
            until    : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
            shopName : adAccounts[site].shop.name
        }
    ] : null, POST)

    if (!adAccounts) return <LoadingSpinner/>
    if (adAccounts.length === 0) return <NoShopsConnected/>

    const siteOptions = adAccounts.map((adAccount, i) => Object.create({ i, label : adAccount.shop.name }))

    if (!shopifyData) return <LoadingSpinner/>

    return ( <>
        <div className="p-4 md:grid md:grid-cols-2 gap-8 justify-end">
            <div>
                <Select isSearchable={false}
                        defaultValue={siteOptions[0]}
                        options={siteOptions}
                        onChange={(site) => setSite(site.i)}/>
            </div>
            <div className="mt-8 md:mt-0 text-center md:text-left">
                <DateRangePicker className="md:flex md:justify-end"
                                 ranges={[dateRange]}
                                 onChange={({ selection }) => setDateRange(selection)}
                                 staticRanges={defaultStaticRanges}/>
            </div>
        </div>
        <div className="p-4">
            <SessionOverview shopifyData={shopifyData}/>
        </div>
    </> )
}

const NoShopsConnected = () => (
<div className="p-4 bg-white flex items-center m-8 flex-col">No Shops Connected
    <button className="btn mt-8" onClick={() => router.push('/facebook/adAccountOverview')}>Connect a Shop</button>
</div> )

const SessionOverview = ({ shopifyData }) => {
    const orderList = shopifyData.orders.map(order => {
        const { name, processedAt, customerJourney } = order.node

        return ( <>
            <tr key={name} className="p-8">
                <td className="p-4">{name}</td>
                <td className="p-4">{processedAt.substring(0, 10)}</td>
                <td className="p-4">Sessions: {customerJourney?.moments.length}</td>
                <td className="p-4">Days to Conversion: {customerJourney?.daysToConversion}</td>
            </tr>
            {sessionList(customerJourney)}
        </>
        )
    })

    return (
    <div className="bg-white p-4">
        <div>Average Session Length: {shopifyData.averageMomentCount?.toFixed(2)} sessions</div>
        <div>Average Days to Conversion: {shopifyData.averageDaysToConversion?.toFixed(2)} days</div>
        <table className="table-fixed w-full p-8 mt-8">
            <tbody className="bg-gray-100 p-8">
            {orderList}
            </tbody>
        </table>
        <pre>{JSON.stringify(shopifyData, null, 2)}</pre>
    </div>
    )
}

const sessionList = (customerJourney) => {
    return customerJourney?.moments.map((session, index) => {
        return (
        <tr key={index} className="p-8 bg-white">
            <td className="p-4 pr-6">Session {index + 1}</td>
            <td className="p-4">{session.occurredAt.substring(0, 10)}</td>
            <td className="p-4">{IconGenerator(session.source)}</td>
            <td className="p-4">{session.referrerUrl}</td>
        </tr>
        )
    })
}

const IconGenerator = (source) => {
    if (source === 'Google') return (
    <svg className="h-8 w-8 text-red-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M17.788 5.108A9 9 0 1021 12h-8"/>
    </svg>
    )
    if (source === 'an unknown source') return (
    <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    )
    if (source === 'direct') return (
    <svg className="h-8 w-8 text-yellow-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="18" y1="11" x2="12" y2="5"/>
        <line x1="6" y1="11" x2="12" y2="5"/>
    </svg>
    )
    if (source === 'email') return(
    <svg className="h-8 w-8 text-indigo-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <polyline points="3 7 12 13 21 7"/>
    </svg>
    )
    return source
}





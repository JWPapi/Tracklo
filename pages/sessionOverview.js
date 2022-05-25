import useSWR from 'swr'
import { useState } from 'react'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges } from 'react-date-range'
import LoadingSpinner from '../layout/components/LoadingSpinner'
import { DateTime } from 'luxon'
import axios from 'axios'
import router from 'next/router'
import IconGenerator from '../layout/generator/iconGenerator'
import NoShopsConnected from '../layout/components/NoShopsConnected'

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

const orderRow = (order) => {
    const { name, processedAt, customerJourney } = order.node
    return ( <>
        <tr key={name} className="p-8 bg-gray-100">
            <td className="p-4">{name}</td>
            <td className="p-4">{processedAt.substring(0, 10)}</td>
            <td className="p-4">Sessions: {customerJourney?.moments.length}</td>
            <td className="p-4">Days to Conversion: {customerJourney?.daysToConversion}</td>
        </tr>
        {customerJourney?.moments.map(sessionRow)}
    </>
    )
}

const SessionOverview = ({ shopifyData }) => {
    //ToDo: Should be outside of this component
    const orderList = shopifyData.orders.map(orderRow)
    return (
    <div className="bg-white p-4">
        <div>Average Session Length: {shopifyData.averageMomentCount?.toFixed(2)} sessions</div>
        <div>Average Days to Conversion: {shopifyData.averageDaysToConversion?.toFixed(2)} days</div>
        <table className="table-fixed w-full p-8 mt-8">
            {orderList}
        </table>
        <pre>{JSON.stringify(shopifyData, null, 2)}</pre>
    </div>
    )
}

const sessionRow = (session, index) => {
    return (
    <tr key={index} className="p-8">
        <td className="p-4 pr-6">Session {index + 1}</td>
        <td className="p-4">{session.occurredAt.substring(0, 10)}</td>
        <td className="p-4">{IconGenerator(session.source)}</td>
        <td className="p-4">{session.referrerUrl}</td>
    </tr>
    )
}









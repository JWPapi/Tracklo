import useSWR from 'swr'
import { useState } from 'react'
import _ from 'lodash'
import AdsTable from '../layout/pages/adsOverview/AdsTable'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges } from 'react-date-range'
import TrackingTemplateAlert from '../layout/pages/adsOverview/TrackingTemplateAlert'
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
        <div className="p-4 bg-white">
            {shopifyData === undefined && <LoadingSpinner/>}
            {shopifyData.averageMomentCount === null && 'No Orders Found'}
            {shopifyData && <SessionOverview shopifyData={shopifyData} /> }
        </div>
    </> )
}

const NoShopsConnected = () => (
<div className="p-4 bg-white flex items-center m-8 flex-col">No Shops Connected
    <button className="btn mt-8" onClick={() => router.push('/facebook/adAccountOverview')}>Connect a Shop</button>
</div> )

const SessionOverview = ({shopifyData}) => {
    return (
    <>
        <div>Average Session Length: {shopifyData.averageMomentCount.toFixed(2)} sessions</div>
        <div>Average Days to Conversion: {shopifyData.averageDaysToConversion.toFixed(2)} days</div>
    </>
    )
}






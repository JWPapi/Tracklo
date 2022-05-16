import useSWR from 'swr'
import { useState } from 'react'
import _ from 'lodash'
import AdsTable from '../layout/pages/adsOverview/AdsTable'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges } from 'react-date-range'
import TrackingTemplateAlert from '../layout/pages/adsOverview/TrackingTemplateAlert'
import LoadingSpinner from '../layout/components/LoadingSpinner'
import router from 'next/router'
import { DateTime } from 'luxon'
import axios from 'axios'

const GET = (...args) => axios.get(...args).then(res => res.data)
const POST = (...args) => axios.post(...args).then(res => res.data)

export default function Home() {
    const [utm, setUtm] = useState({ value: { trackingName : 'utm_campaign', fbName : 'campaign'} , label : 'Campaigns' })
    const [site, setSite] = useState(0)
    const [dateRange, setDateRange] = useState({
        startDate : new Date(),
        endDate   : new Date(),
        key       : 'selection'
    })

    //Data Calls
    const { data : utmOptions } = useSWR('/api/db/READ/trackingEntities', GET)
    const { data : adAccounts } = useSWR('/api/db/READ/connectedShops', GET)
    const validAccountsFound = adAccounts && adAccounts?.length > 0

    const { data : wcData } = useSWR(validAccountsFound ? [
        `/api/Shopify/getOrdersByUtm`, {
            utmSelect : utm.value.trackingName,
            since     : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
            until     : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
            shopName  : adAccounts[site].shop.name
        }
    ] : null, POST)

    const { data : fbData } = useSWR(validAccountsFound ? [
        '/api/Facebook/getEntityInsights',
        {
            since       : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
            until       : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
            type        : utm.value.fbName,
            adAccountId : adAccounts[site].adAccount.accountId
        }
    ] : null, POST)

    if (!adAccounts) return <LoadingSpinner/>
    if (adAccounts.length === 0) return <NoShopsConnected/>

    const siteOptions = adAccounts.map((adAccount, i) => Object.create({ i, label : adAccount.shop.name }))
    const mergedData = _.merge(fbData, wcData)
    const rowData = _.values(mergedData)

    return ( <>
        <div className="p-4 md:grid md:grid-cols-2 gap-8 justify-end">
            <div>
                <Select className="mb-8"
                        defaultValue={utm}
                        options={utmOptions.map(utm => Object.create({ value : utm, label : utm.label }))}
                        onChange={setUtm}
                        isSearchable={false}/> <Select isSearchable={false}
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
        <div className=" p-4">
            <TrackingTemplateAlert/> <AdsTable data={rowData} selection={utm}/>
        </div>
    </> )
}

const NoShopsConnected = () => (
<div className="p-4 bg-white flex items-center m-8 flex-col">No Shops Connected
    <button className="btn mt-8" onClick={() => router.push('/facebook/adAccountOverview')}>Connect a Shop</button>
</div> )






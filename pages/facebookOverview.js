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
import { useSession } from 'next-auth/react'
import { generateSiteOptions, todayDateRange, utmDefaultOption } from '../utils/utils'

const GET = (...args) => axios.get(...args).then(res => res.data)
const POST = (...args) => axios.post(...args).then(res => res.data)

export default function Home() {
    const {data : session, status } = useSession()
    const [utm, setUtm] = useState(utmDefaultOption)
    const [site, setSite] = useState(0)
    const [dateRange, setDateRange] = useState(todayDateRange)

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
            since : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
            until : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
            type : utm.value.fbName,
            adAccountId : adAccounts[site].adAccount.accountId
        }
    ] : null, POST)
    if (status === 'unauthenticated') return <p>Access Denied</p>
    if (!adAccounts) return <LoadingSpinner/>
    if (adAccounts.length === 0) return <NoShopsConnected/>

    const siteOptions = generateSiteOptions({adAccounts})

    return ( <div className="card bg-base-200 p-4 border border-primary">
        <div className="p-4 md:grid md:grid-cols-2 gap-8 justify-end">
            <div>
                <Select className="mb-8 max-w-xs"
                        options={utmOptions?.map(utm => Object.create({ value : utm, label : utm.label }))}
                        onChange={setUtm}
                        defaultValue={utmOptions[0]}
                        isSearchable={false}/> <Select className="w-full max-w-xs"
                                                       defaultValue={siteOptions[0]}
                                                       isSearchable={false}
                                                       options={siteOptions}
                                                       onChange={(site) => setSite(site.i)}/>
            </div>
            <div className="mt-8 md:mt-0 text-center md:text-left">
                <DateRangePicker className="md:flex md:justify-end"
                                 ranges={[dateRange]}
                                 rangeColors={['#B4ADEA']}
                                 color={'#B4ADEA'}
                                 onChange={({ selection }) => setDateRange(selection)}
                                 staticRanges={defaultStaticRanges}/>
            </div>
        </div>
        <div className=" p-4">
            <TrackingTemplateAlert/> <AdsTable data={_.values(_.merge(fbData, wcData))} selection={utm}/>
        </div>
    </div> )
}

const NoShopsConnected = () => (
<div className="p-4 bg-white flex items-center m-8 flex-col">No Shops Connected
    <button className="btn mt-8" onClick={() => router.push('/facebook/adAccountOverview')}>Connect a Shop</button>
</div> )






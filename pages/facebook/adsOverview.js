import useSWR from 'swr'
import { useState } from 'react'
import *  as FbRequestGenerator from '../../utils/FbRequestGenerator'
import * as shopRequestGenerator from '../../utils/ShopSoftwareRequestGenerator'
import _ from 'lodash'
import AdsTable from '../../layout/elements/AdsTable'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges, defaultInputRanges } from 'react-date-range'

const locale = require('date-fns/locale/de/index.js')
import { useTranslation } from 'react-i18next'

const fetcher = (...args) => fetch(...args).then(r => r.json())


const utmOptions = [
    { value : 'utm_campaign', label : 'Kampagnen' },
    { value : 'utm_medium', label : 'Anzeigengruppen' },
    { value : 'utm_content', label : 'Anzeigen' }
]

export default function Home() {
    const [utm, setUtm] = useState('utm_campaign')
    const [site, setSite] = useState('no-shop')
    const [dateRange, setDateRange] = useState({
        startDate : new Date(),
        endDate   : new Date(),
        key       : 'selection'
    })
    const { t } = useTranslation()

    const { data : adAccounts } = useSWR('/api/db/getConnectedShops', fetcher)
    const shopRequest = shopRequestGenerator.getOrdersByUtm(
    {
        utmSelect: utm,
        site,
        dateRange,
        sourceFilter: ['meta_id'],
        shopName :  adAccounts?.find(s => s.shop.name === site)?.shop.name,
    })
    const { data : wcData } = useSWR(adAccounts ? shopRequest: null , fetcher)

    const { data : fbData } = useSWR(adAccounts? FbRequestGenerator.getEntityInsights(
    {
        type: utm,
        dateRange: dateRange,
        adAccountId:  adAccounts?.find(s => s.shop.name === site)?.adAccount.accountId
    }) : null, fetcher)
    if (!adAccounts) return <div>Loading...</div>
    const siteOptions = adAccounts.map(adAccount => {
        return { value : adAccount.shop.name, label : adAccount.shop.name, data : adAccount }
    })



    const staticRanges = defaultStaticRanges.map(range => {
        range.label = t(range.label)
        return range
    })

    const handleDateSelect = ({ selection }) => {setDateRange(selection)}
    const handleUtmSelect = (utm) => setUtm(utm.value)
    const handleSiteSelect = (site) => {
        setSite(site.value)
    }



    const mergedData = _.merge(fbData, wcData)
    const rowData = _.values(mergedData)

    return ( <>
        <div className="p-4 md:grid md:grid-cols-2 gap-8 justify-end">
            <div>
                <Select className="mb-8"
                        defaultValue={utmOptions[0]}
                        options={utmOptions}
                        onChange={handleUtmSelect}/>
                <Select defaultValue={siteOptions[0]}
                        options={siteOptions}
                        onChange={handleSiteSelect}/>
            </div>
            <div className="mt-8 md:mt-0 text-center md:text-left">
                <DateRangePicker className="md:flex md:justify-end"
                                 ranges={[dateRange]}
                                 onChange={handleDateSelect}
                                 staticRanges={staticRanges}
                                 locale={locale}/>
            </div>
        </div>

        <div className=" p-4">
            <AdsTable data={rowData}
                      selection={utm}/>
        </div>
    </> )
}








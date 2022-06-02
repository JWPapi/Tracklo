import useSWR from 'swr'
import { useState } from 'react'
import Select from 'react-select'
import { DateRangePicker, defaultStaticRanges } from 'react-date-range'
import LoadingSpinner from '../layout/components/LoadingSpinner'
import { DateTime } from 'luxon'
import axios from 'axios'
import IconGenerator from '../layout/generator/iconGenerator'
import NoShopsConnected from '../layout/components/NoShopsConnected'
import { useSession } from 'next-auth/react'
import _ from 'lodash'
import { todayDateRange } from '../utils/utils'
const GET = (...args) => axios.get(...args).then(res => res.data)
const POST = (...args) => axios.post(...args).then(res => res.data)

export default function SessionOverviewPage () {
  const { data:  session, status } = useSession()
  const [site, setSite] = useState(0)
  const [dateRange, setDateRange] = useState(todayDateRange)

  const { data: adAccounts } = useSWR('/api/db/READ/connectedShops', GET)
  const { data: shopifyData } = useSWR(!_.isEmpty(adAccounts) ? [
    `/api/Shopify/getAverageSessionLength`, {
      since   : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
      until   : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
      shopName: adAccounts[site].shop.name
    }
  ] : null, POST)

  if (status === 'unauthenticated') return <p>Access Denied</p>
  if (!adAccounts) return <LoadingSpinner/>
  if (adAccounts.length === 0) return <NoShopsConnected/>

  const siteOptions = adAccounts.map((adAccount, i) => Object.create({
    i, label: adAccount.shop.name, value: adAccount.shop.name
  }))

  if (!shopifyData) return <LoadingSpinner/>

  return (
    <div className="card border border-primary p-4 bg-base-200">
      <div className="p-4 md:grid md:grid-cols-2 gap-8 justify-end">
        <div>
          <Select isSearchable={false}
                  className="outline-primary-focus text-base-300"
                  defaultValue={siteOptions[site]}
                  options={siteOptions}
                  onChange={(site) => setSite(site.i)}/>
        </div>
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <DateRangePicker className="md:flex md:justify-end text-base-content"
                           ranges={[dateRange]}
                           rangeColors={['#B4ADEA']}
                           color={'#B4ADEA'}
                           onChange={({ selection }) => setDateRange(selection)}
                           staticRanges={defaultStaticRanges}/>
        </div>
      </div>
      <div className="p-4">
        <SessionOverview shopifyData={shopifyData}/>
      </div>
    </div>
  )
}

const orderRow = (order) => {
  const { name, processedAt, customerJourney } = order.node
  return ( <>
      <tr key={name} className="active">
        <td>{name}</td>
        <td>{DateTime.fromISO(processedAt).toFormat('dd.LL.yy')}</td>
        <td>{customerJourney ? 'Sessions: ' + customerJourney.moments.length : 'local sale'}</td>
        <td>{customerJourney && 'Days to Conversion: ' + customerJourney.daysToConversion}</td>
      </tr>

      {customerJourney?.moments.map((session, index) => sessionRow(session, index, processedAt))}
    </>
  )
}

const SessionOverview = ({ shopifyData }) => {
  //ToDo: Should be outside of this component
  const orderList = shopifyData.orders.map(orderRow)
  return (
    <div className="p-4">
      <div className="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>Average Session Length: {shopifyData.averageMomentCount?.toFixed(2)} sessions</div>
          <div>Average Days to Conversion: {shopifyData.averageDaysToConversion?.toFixed(2)} days</div>
        </div>
      </div>

      <table className="table table-fixed w-full p-8 mt-8 ">
        {orderList}
      </table>
      <pre>{JSON.stringify(shopifyData, null, 2)}</pre>
    </div>
  )
}

const sessionRow = (session, index, processedAt) => {
  if (session.source === 'an unknown source' && session.utmParameters.source === 'meta_id') {
    session.source = 'facebook'
  }

  //ToDo: Icons for placements
  return (
    <tr key={index} className="bg-white text-black">
      <td className="pr-6">Session {index + 1}</td>
      <td>{DateTime.fromISO(session.occurredAt).toRelative({
        base: DateTime.fromISO(processedAt)
      }).replace('ago', 'before')}</td>
      <td>{IconGenerator(session.source)}</td>
      <td></td>
    </tr>
  )
}









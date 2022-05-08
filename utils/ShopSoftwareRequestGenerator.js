import { DateTime } from 'luxon'


export const getOrdersByUtm = (options, site, dateRange, sourceFilter) => {
        return [
            `/api/Shopify/getOrdersByUtm`,
            {
                method  : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body    : JSON.stringify({
                    utmSelect    : options.utmSelect,
                    since        : DateTime.fromJSDate(options.dateRange.startDate).toFormat('yyyy-MM-dd'),
                    until        : DateTime.fromJSDate(options.dateRange.endDate).toFormat('yyyy-MM-dd'),
                    site         : options.site,
                    sourceFilter : options.sourceFilter,
                    shopName     : options.shopName,
                })
            }
        ]
}




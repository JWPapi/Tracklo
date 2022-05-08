import { DateTime } from 'luxon';


export const getEntityInsights = (type, dateRange, site) =>  {
    console.log(type)
    if (typeof type === 'object') {
        return [
            '/api/Facebook/getEntityInsights',
            {
                method  : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body    : JSON.stringify({
                    since : DateTime.fromJSDate(type.dateRange.startDate).toFormat('yyyy-MM-dd'),
                    until : DateTime.fromJSDate(type.dateRange.endDate).toFormat('yyyy-MM-dd'),
                    type  : type.type,
                    adAccountId : type.adAccountId
                })
            }
        ]
    }
    return [
        '/api/Facebook/getEntityInsights',
        {
            method  : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body    : JSON.stringify({
                since : DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd'),
                until : DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd'),
                type  : type,
                site
            })
        }
    ]
}

export const getAccountOverview = (site, field = 'spend') => {
    return [
        '/api/Facebook/getAccountOverview',
        {
            method  : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body    : JSON.stringify({
                site,
                field
            })
        }
    ]
}
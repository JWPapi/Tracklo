export default function fbEntityByUtmSelect (utmselect) {
    if (utmselect === 'utm_campaign') return 'campaign'
    if (utmselect === 'utm_medium') return 'adset'
    if (utmselect === 'utm_content') return 'ad'
    throw new Error('Invalid utmselect: ' + utmselect)
}
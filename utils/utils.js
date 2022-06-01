export const todayDateRange = {
    startDate : new Date(),
    endDate   : new Date(),
    key       : 'selection'
}
export const utmDefaultOption = {
    value : { trackingName : 'utm_campaign', fbName : 'campaign' }, label : 'Campaigns'
}

export const generateSiteOptions = ({adAccounts: adAccounts}) => {
    return adAccounts.map((adAccount, i) => Object.create({
        i, label : adAccount.shop.name, value : adAccount.shop.name
    }))
}

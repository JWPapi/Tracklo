import { getSession } from 'next-auth/react'
import { prisma } from '../../../db'

const adsSdk = require('facebook-nodejs-business-sdk')

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(401).send('Only logged in users can access this endpoint')

    console.log(session.sub)

    const facebookAccount = await prisma.account.findFirst({
        where : {
            userId   : session.sub,
            provider : 'facebook'
        }
    })

    if (!facebookAccount) return res.status(404).send('No Facebook account found')
    const accessToken = facebookAccount.access_token
    const api = adsSdk.FacebookAdsApi.init(accessToken)

    const user = new adsSdk.User(facebookAccount.providerAccountId)

    const adAccounts = await user.getAdAccounts(['name','id'])
    const adAccountsConnectionChecked = adAccounts.map(async adAccount => {
        adAccount._data.connected  = await prisma.adAccount.findFirst({
            where : {
                accountId: adAccount._data.id,
                userId: session.sub
            }
        })
        return adAccount._data
    })

    res.json(await Promise.all(adAccountsConnectionChecked))
}
import { getSession } from 'next-auth/react'
import { prisma } from '../../../db'

export default async function handler(req,res)  {

    const session = await getSession({ req })

    const adAccounts = await prisma.adAccount.findMany({
        where: {
            userId: session.sub
        }
    })

    const connectedShops = await Promise.all(adAccounts.map(async adAccount  => {
        const shop = await prisma.shop.findFirst({
            where: {
                adAccountId: adAccount.id
            }
        })
        return {
            adAccount,
            shop
        }
    })).then(shops => {
        return shops.filter(shop => shop.shop !== null)
    })
    res.json(connectedShops)
}
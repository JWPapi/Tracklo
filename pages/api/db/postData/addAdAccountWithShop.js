import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Only Post Allowed')
    const session = await getSession({ req })
    if (!session) return res.status(401).send('Only logged in users can access this endpoint')

    const { adAccount, token, shopName } = req.body

    //ToDo: Validate with Shopify
    //ToDo: Check if all variables are present

    const insertedAdAccount = await prisma.adAccount.create({
        data : {
            accountId : adAccount,
            userId    : session.sub
        }
    })

    const shop = await prisma.shop.create({
        data : {
            token,
            adAccountId : insertedAdAccount.id,
            name: shopName
        }
    })

    res.status(200).json({ adAccount, shop })
}
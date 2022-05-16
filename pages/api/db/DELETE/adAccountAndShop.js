import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Only Post Allowed')
    const session = await getSession({req})
    const { id } = req.body
    console.log(id)
    const adAccount = await prisma.adAccount.findFirst({
        where : {
            accountId : id,
            userId: session.sub
        }
    })

    const deleteShop = await prisma.shop.deleteMany({
        where : {
            adAccountId : adAccount.id
        }
    })

    const deleteAdAccount = await prisma.adAccount.delete({
        where : {
            id: adAccount.id
        }
    })

    const responses = await Promise.all([deleteAdAccount, deleteShop])
    console.log(responses)

    res.status(200).json('job done')
}
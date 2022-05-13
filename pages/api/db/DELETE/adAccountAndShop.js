import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Only Post Allowed')
    const { id } = req.body
    const deleteAdAccount = prisma.adAccount.findFirst({
        where : {
            accountId : id
        }
    }).delete()

    const deleteShop = prisma.shop.findFirst({
        where : {
            adAccountId : id
        }
    }).delete()

    await Promise.all([deleteAdAccount, deleteShop])

    res.status(200).json('job done')
}
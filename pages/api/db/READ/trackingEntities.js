import { prisma } from '../../../../db'

export default async function handler(req,res)  {

    const trackingEntities = await prisma.trackingEntity.findMany()
    res.status(200).json(trackingEntities)
}
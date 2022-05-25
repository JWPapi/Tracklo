const _ = require('lodash')
const Shopify = require('shopify-api-node')
import { prisma } from '../../../db'

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Method not allowed')
    const { since, until, shopName } = req.body

    const token = await prisma.shop.findFirst({
        where : {
            name : shopName
        }
    }).then(shop => shop.token)

    const queryString = `{
    orders (first: 100, reverse: true, query:"created_at:>${since} created_at:<${until}") {
        edges {
            node {
                customerJourney {
                    moments {
                        ...on CustomerVisit {
                            utmParameters {
                                source
                                campaign
                                content
                                medium
                                term
                            }
                        }
                    }
                    daysToConversion
                }
                totalPriceSet {
                    presentmentMoney    {
                        amount
                        currencyCode
                    }
               }
            }
        }
    }
}`

    const shopify = new Shopify({
        shopName    : shopName,
        accessToken : token
    })

    const orders = await shopify.graphql(queryString).then(response => response.orders.edges)
    const customerJourneys = orders.map(order => order.node.customerJourney).filter(journey => journey)
    console.log(customerJourneys)

    const orderMomentsCount = customerJourneys.map(journey => journey.moments.length)
    const averageMomentCount = orderMomentsCount.reduce((a, b) => a + b, 0) / orderMomentsCount.length

    const orderDaysToConversion = customerJourneys.map(journey => journey.daysToConversion)
    const averageDaysToConversion = orderDaysToConversion.reduce((a, b) => a + b, 0) / orderDaysToConversion.length

    res.status(200).json({
        averageMomentCount,
        averageDaysToConversion
    })
}
const _ = require('lodash')
const Shopify = require('shopify-api-node')
import { prisma } from '../../../db'

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Method not allowed')
    const { utmSelect, since, until, shopName } = req.body

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

    const orders = await shopify.graphql(queryString)
    const metaOrders = orders['orders']['edges'].filter(order => {
        return order.node['customerJourney']?.moments.some(moment => moment['utmParameters']?.source === 'meta_id')
    })
    const utmString = utmSelect.replace('utm_', '')
    const utmParameters = _.uniq(metaOrders.map(order => {
        if (order.node.customerJourney.moments[0]['utmParameters'] == null) return null
        return order.node.customerJourney.moments[0]['utmParameters'][utmString]
    }))
    const summary = utmParameters.map(utmParameter => {
        const ordersByUtmParameter = metaOrders.filter(order => {
            if (order.node.customerJourney.moments[0]['utmParameters'] == null) return false
            return order.node.customerJourney.moments[0]['utmParameters'][utmString] === utmParameter
        })
        const value = ordersByUtmParameter.reduce((acc, order) => {
            return acc + Number(order.node['totalPriceSet']['presentmentMoney'].amount)
        }, 0)
        return {
            id     : utmParameter,
            value,
            count  : ordersByUtmParameter.length,
            source : 'meta_id'
        }
    })

    const summaryObject = summary.reduce((acc, campaign) => {
        acc[campaign.id] = campaign
        return acc
    }, {})

    res.status(200).json(summaryObject)
}

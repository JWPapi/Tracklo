const _ = require('lodash')
const Shopify = require('shopify-api-node')

export default async function handler(req, res) {
    if (req.method !== 'POST') res.status(405).send('Method not allowed')
    const { shopName, token } = req.body

    const queryString = `{
    orders (first: 100, reverse: true) {
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
            }
        }
    }
}`

    try {
        const shopify = new Shopify({
            shopName    : shopName,
            accessToken : token
        })
        const data = await shopify.graphql(queryString)
        res.status(200).json({ success : true })
    } catch (err) {
        res.status(200).json({ success : false })
    }
}

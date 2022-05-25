import router from 'next/router'

export default function NoShopsConnected() {
    return (
    <div className="p-4 bg-white flex items-center m-8 flex-col">No Shops Connected
        <button className="btn mt-8" onClick={() => router.push('/facebook/adAccountOverview')}>Connect a Shop</button>
    </div>
    )
}
import { CheckIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

export default function ConnectedShopMessage() {
    const router = useRouter()
    const onClick = () => {
        router.push('/facebook/adsOverview')
    }
    return (
    <>
        <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon className="h-6 w-6 text-green-600"
                           aria-hidden="true"/>
            </div>
            <div className="mt-3 text-center sm:mt-5">
                Shop successfully connected
            </div>
        </div>
        <div className="mt-5 sm:mt-6">
            <button type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={onClick}>
                Go to the AdOverview
            </button>
        </div>
    </>
    )
}
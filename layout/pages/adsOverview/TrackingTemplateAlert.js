/* This example requires Tailwind CSS v2.0+ */
import { InformationCircleIcon } from '@heroicons/react/solid'

export default function TrackingTemplateAlert() {
    return (
    <div className="rounded-md-top bg-blue-50 p-4">
        <div className="flex">
            <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400"
                                       aria-hidden="true"/>
            </div>
            <div className="ml-3 ">
                <div className="text-sm text-blue-700">Please make sure your Tracking Template on Facebook is set up exactly as this:
                </div>
                <code>{`utm_source=meta_id&utm_campaign={{campaign.id}}&utm_medium={{adset.id}}&utm_content={{ad.id}}&utm_term={{placement}}`}</code>
            </div>
        </div>
    </div>
    )
}

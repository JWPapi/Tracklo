/* This example requires Tailwind CSS v2.0+ */

export default function TrackingTemplateAlert () {
  return (
    <div className="alert alert-info shadow-lg mb-8">
      <div>

        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             className="stroke-current flex-shrink-0 w-6 h-6">
          <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>

          <div> Please make sure your Tracking Template on Facebook is set up exactly like this:</div>

          <code className="bg-white">{`utm_source=meta_id&utm_campaign={{campaign.id}}&utm_medium={{adset.id}}&utm_content={{ad.id}}&utm_term={{placement}}`}</code>
          <div className="mt-8"> We are using First-Click attribution.</div>

        </div>
      </div>
    </div>
  )
}

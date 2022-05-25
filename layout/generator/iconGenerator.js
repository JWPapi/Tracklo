export default function IconGenerator(source) {
    if (source === 'Google') return (
    <svg className="h-8 w-8 text-red-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M17.788 5.108A9 9 0 1021 12h-8"/>
    </svg>
    )
    if (source === 'an unknown source') return (
    <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    )
    if (source === 'direct') return (
    <svg className="h-8 w-8 text-yellow-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="18" y1="11" x2="12" y2="5"/>
        <line x1="6" y1="11" x2="12" y2="5"/>
    </svg>
    )
    if (source === 'email') return(
    <svg className="h-8 w-8 text-indigo-500"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <polyline points="3 7 12 13 21 7"/>
    </svg>
    )
    return source
}
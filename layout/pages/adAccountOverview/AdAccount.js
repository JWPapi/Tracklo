export default function AdAccount({ id, name, connected, onClick }) {

    return ( <li key={id}>
        <div className="flex items-center p-8 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{id}</span>
                        </p>
                    </div>
                    <div className="flex justify-center align-items-center">
                        {!connected && <button type="button"  className="btn" onClick={() => onClick(id)}>Connect Shopify </button>}
                        {connected && <span>Already connected</span>}
                    </div>
                </div>
            </div>
        </div>
    </li> )
}
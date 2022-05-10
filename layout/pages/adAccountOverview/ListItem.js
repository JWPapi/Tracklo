export default function ListItem({ props }) {

    const Button = (connected) => {
        if (connected.connected === null) {
            return ( <button type="button"
                             className="inline-flex items-center  px-6 py-3 border border-transparent text-base
                                font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                             onClick={props.onClick}>
                Connect Shopify </button> )
        }
        return <span>Already connected</span>
    }

    return ( <li key={props.id}>
        <div className="flex items-center p-8 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">{props.name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{props.id}</span>
                        </p>
                    </div>
                    <div className="flex justify-center align-items-center">
                        <Button connected={props.connected}/>
                    </div>
                </div>
            </div>
        </div>
    </li> )
}
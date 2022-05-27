import Sidebar from './Sidebar.js'

export default function Layout({ children }) {
    return (
    <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
        <div className="drawer-content p-8 bg-white">
            {children} <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open
                                                                                                        drawer</label>
        </div>
        <Sidebar/>
    </div>
    )
}
import Sidebar from './Sidebar'
import {Footer} from './sections'

const Layout = ({ children }) => (
<div className="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
    <div className="drawer-content p-8 bg-base-100 ">
        {children} <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    </div>
    <Sidebar/>
    <Footer/>
</div>
)
export default Layout
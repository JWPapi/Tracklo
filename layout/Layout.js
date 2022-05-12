import Sidebar from './Sidebar.js'


export default function Layout({ children }) {
    return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-hidden">
        <Sidebar/>
        <main className="w-full bg-brand-dark-gray min-h-screen">{children}</main>
    </div>
    )
}
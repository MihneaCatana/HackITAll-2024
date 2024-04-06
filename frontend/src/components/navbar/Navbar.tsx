import { Link, Outlet } from "react-router-dom"
import { Bars4Icon } from "@heroicons/react/24/solid"

function Navbar() {
  return (
    <div className="drawer">
        <input id="sidebar" type="checkbox" className="drawer-toggle" />
        <div className="relative drawer-content">
            <div className="flex items-center justify-between border-b-2 border-white py-[1vh] px-[5vw]">
                <div className="flex items-center">
                    <label htmlFor="sidebar" className="btn top-4 left-4 drawer-button">
                        <Bars4Icon className="w-12 h-12 text-white cursor-pointer hover:text-gray-300" />
                    </label>
                    
                    <h1 className="ml-4 text-2xl font-bold">Energy Buddy</h1>
                </div>

                <span>Nume user</span>
            </div>

            <div className="py-[5vh] px-[5vw]">
                <Outlet />
            </div>
        </div> 
        <div className="drawer-side">
            <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="flex items-center justify-center w-64 min-h-full p-4 text-lg menu bg-base-200 text-base-content">
                <Link to={`/dashboard`}>
                    <li className="hover:text-blue-500">Dashboard</li>
                </Link>

                <Link to={`/management`}>
                    <li className="hover:text-blue-500">Management</li>
                </Link>

                <Link to={`/create-space`}>
                    <li className="hover:text-blue-500">Create space</li>    
                </Link>

                <Link to={`/edit-space`}>
                    <li className="hover:text-blue-500">Edit space</li>
                </Link>
                
                <Link to={`/subscription`}>
                    <li className="hover:text-blue-500">Subscription</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
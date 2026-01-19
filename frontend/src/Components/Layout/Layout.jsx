import {Outlet} from "react-router"
import NavBar from "./NavBar"

export default function Layout() {
    return(
        <>
        <NavBar/>
        {/** Find out hot to space the page properly */}
        <div className="m-7">
        <Outlet/>
        </div>
        </>
    )
}
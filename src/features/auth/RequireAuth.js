import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken} from "./authSlice";
import SideNavbar from "../../Side";
import {useState } from "react";



const RequireAuth = () => {
    let token = useSelector(selectCurrentToken)
    const location = useLocation()


    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }


    return (
        // token
        // ?  
        <div>
            <SideNavbar darkModeHandler={darkModeHandler} dark={dark} />
            <Outlet />
        </div>
        // : <Navigate to = '/' state = {{from: location}} replace />
    )
}

export default RequireAuth
import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from '../Side';

const Layout = () => {
    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
  return (
    <div>
         <SideNavbar darkModeHandler= {darkModeHandler} dark = {dark}/>
        <Outlet /> 
    </div>
  )
}

export default Layout
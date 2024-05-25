import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import Home from '../../pages/Home';

import React from 'react'

const PersistLogin = () => {
    const [persist] = usePersist()
    const location = useLocation()
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading, 
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        // if(effectRan.current === true) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (error) {
                    console.error(error)
                }
            }
            if(!token && persist) verifyRefreshToken()
        // }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])

    let content
    if(!persist) { //no persist
        console.log("no persist")
        content = <Outlet />
    }
    else if (isLoading) { //Pesist: yes, token : no
        console.log("loading")
        // content = <> Loading ...</>
        // content = <Home />
        navigate('/', { state: { from: location } });
    } 
    else if (isError) { // persist: yes token: no
        console.log('error')
        content = <Link to={'/'}> Login again </Link>
    }
    else if (isSuccess && trueSuccess) { // persist : yes, token : yes
        console.log("success")
        content = <Outlet />
    }
    else if (token && isUninitialized) { // persist: yes token: yes
        console.log("token and uninit")
        console.log(isUninitialized)
        content = <Outlet />
    }
    

  return content
}

export default PersistLogin
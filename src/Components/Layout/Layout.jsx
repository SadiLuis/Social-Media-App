import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/Auth';
import { LOGIN } from '../../Routes/Routes';

function Layout() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const { user, isLoading} = useAuth();

    
    useEffect(() => {
        if(pathname.startsWith("/protected") && !user ) {
            navigate(LOGIN)
        }
    }, [pathname, user])
    
    if(isLoading) return "Loading..";

  return (
    <>
    Thia is a child: <Outlet/>
    </>
  )
}

export default Layout
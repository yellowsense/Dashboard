import { ProviderContext } from 'context/StoreContext'
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {isAuth} = useContext(ProviderContext)
  return isAuth ?<Outlet/>:<Navigate to="/login"/>
}

export default PrivateRoute
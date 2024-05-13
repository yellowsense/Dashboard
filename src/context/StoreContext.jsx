import React, { createContext, useEffect, useState } from 'react'

export const ProviderContext = createContext()

const StoreContext = ({children}) => {
  useEffect(()=>{
    if(sessionStorage.getItem("authAdmin")){
      setAuth(sessionStorage.getItem("authAdmin"));
    }
  },[])
    const [isAuth, setAuth] = useState(false)
  return (
    <ProviderContext.Provider value={{isAuth, setAuth}}>
        {children}
    </ProviderContext.Provider>
  )
}

export default StoreContext
import React, { createContext, useContext, useEffect, useState } from 'react'


export const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({logged: false});
    // useEffect(() => {
    //     if (!userData){
    //         const request = localStorage.getItem('user')
    //         const parse = JSON.parse(request)
    //         setUserData(parse)
    //     } else {
    //         localStorage.setItem('user', JSON.stringify(userData))
    //     }
    // }, [userData])
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserData = () => useContext(UserContext)

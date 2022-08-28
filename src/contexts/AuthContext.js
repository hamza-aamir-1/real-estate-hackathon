import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userStatus, setUserStatus] = useState(false)
    const [userData, setUserData] = useState({})

    

    return <AuthContext.Provider value={{userStatus, setUserStatus}}>{children}</AuthContext.Provider>
};
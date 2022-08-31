import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebase } from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [userStatus, setUserStatus] = useState(firebase.auth().currentUser ? true : false);
    const [userData, setUserData] = useState({});

    

    return <AuthContext.Provider value={{userStatus, setUserStatus}}>{children}</AuthContext.Provider>
};
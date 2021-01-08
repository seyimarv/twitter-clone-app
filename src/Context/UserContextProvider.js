import React, { createContext,  useState } from "react";




const initialState = {
    currentUser: null
}
export const UserContext = createContext(initialState);


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)


    return (
        <UserContext.Provider value={{
            user: user,
            setUser: setUser,
        }} >
            {children}
        </UserContext.Provider>
    )
}
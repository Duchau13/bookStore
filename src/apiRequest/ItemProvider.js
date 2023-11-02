import { createContext, useState } from "react";

const AuthItems = createContext({});


export const AuthProvider = ({children}) => {
    const [items,setItems] = useState([])
    return(
        <AuthItems.Provider value={{items,setItems}}>
            {children}
        </AuthItems.Provider>
    )
}
    
export default AuthItems;

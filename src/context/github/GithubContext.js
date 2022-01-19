import { createContext, useState } from "react";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers =async ()=> {
        const response = await fetch(`${GITHUB_URL}/users`,
        {headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }
    return <GithubContext.Provider value={{
        users ,
        loading
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;
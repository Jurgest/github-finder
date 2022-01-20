import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers =async (text)=> {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
        {headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        const {items} = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }
    //set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    //clear results
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;
import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos:[],
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
//single user
    const getUser =async (login)=> {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`,
        {headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
           if(response.status === 404) {
               window.location = '/notfound'
           } else {
                const data = await response.json()
                dispatch({
                    type: 'GET_USER',
                    payload: data
                })
            }
    }
      // Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
        sort: 'created',
        per_page: 10,
        })

        const response = await fetch(
        `${GITHUB_URL}/users/${login}/repos?${params}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
        )

        const data = await response.json()

        dispatch({
        type: 'GET_REPOS',
        payload: data,
        })
    }

    //set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    //clear results
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;
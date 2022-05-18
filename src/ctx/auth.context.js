import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//La URL de nuestro BACKEND
const API_URL = "http://localhost:5005";

const AuthContext = createContext();

// { Provider }
console.log(AuthContext)

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate()

    /* 
      Functions for handling the authentication status (isLoggedIn, isLoading, user)
      will be added here later in the next step
    */
    const storeToken = (token) => {       //  <==  ADD
        localStorage.setItem('authToken', token);
    }

    const borrarToken = () => {
        localStorage.clear()
        setIsLoggedIn(false)
        setIsLoading(false)
        setUser(null)
        navigate("/")
    }


    const authenticateUser = () => {           //  <==  ADD  
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // If the token exists in the localStorage
        if (storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            axios.get(
                `${API_URL}/verify`,
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            )
                .then((response) => {
                    // If the server verifies that JWT token is valid  
                    const user = response.data;
                    console.log("estos son los datos :) ", response)
                    // Update state variables        
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    // Update state variables         
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }


    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, borrarToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
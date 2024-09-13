import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Correct import
import Toast from "../plugins/Toast";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();  // Correct use of useNavigate

    useEffect(() => {
        if (authTokens) {
            fetchProfileData();
        }
        setLoading(false);
    }, [authTokens]);

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            // fetchProfileData();
            localStorage.setItem("authTokens", JSON.stringify(data));
            // navigate("/home");
            Toast("success","Login Successful")
        } else {
            Toast("error","Username or password does not exist")
        }
    };

    const registerUser = async (email, username, password, password2) => {
        localStorage.clear()
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        });
        if (response.status === 201) {
            // navigate("/home");
            Toast("success","Registration Successful")
        } else {
            Toast("error","An Error Occurred " + response.status + ":" +response.statusText)
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.clear();
        navigate("/");
    };

    const fetchProfileData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens?.access}`
                }
            });
            if (response.ok) {
                const profileData = await response.json();
                // console.log(profileData);
                setUser(profileData);
                // console.log(user)
            } else {
                const errorData = await response.json();
                console.error("Error fetching profile data:", errorData);
                Toast("error","Error fetching profile data")
            }
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            Toast("error","Error fetching profile data")
        }
    };
    

    const updateSubscribe = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/update-subscription/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens?.access}` // Include the token here
                },
                body: JSON.stringify({ subscribed: true })
            });
            // console.log(response)
            if (response.ok) { // Response status 200-299
                // Update user state with new subscription status
                fetchProfileData()
                // console.log(user)
                Toast("success","Subscription Updated Successfully")
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Failed to update subscription:", error);
            Toast("error","Failed to Update Subscription")
        }
    };
    
    const ContextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        updateSubscribe,
        fetchProfileData,
    };

    return (
        <AuthContext.Provider value={ContextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

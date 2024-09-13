import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [refreshing, setRefreshing] = useState(false); // Add a flag to prevent infinite loops

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
            localStorage.setItem("authTokens", JSON.stringify(data));
            Toast("success", `Welcome back! ${jwtDecode(data.access).username}`);
        } else {
            Toast("error", "Username or password does not exist");
        }
    };

    const registerUser = async (email, username, password, password2) => {
        localStorage.clear();
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        });
        const data = await response.json();
    
        if (response.status === 201) {
            Toast("success", "Registration Successful");
            navigate('/home');
        } else if (response.status === 400) {
            // Extracting and displaying specific error messages
            const emailError = data.email ? data.email.join(' ') : '';
            const passwordError = data.password ? data.password.join(' ') : '';
    
            if (emailError) {
                Toast("error", `${emailError}`, 'bottom-right');  // Ensure all parameters are correctly passed
            } else if (passwordError) {
                Toast("error", `${passwordError}`, 'bottom-right', 5000);  // Explicitly pass position and timer
            }
        } else {
            Toast("error", `An Error Occurred: ${response.status} - ${response.statusText}`);
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
                setUser(profileData);
            } else if (response.status === 401 && !refreshing) { // Avoid triggering refresh multiple times
                await refreshToken();
            } else {
                const errorData = await response.json();
                console.error("Error fetching profile data:", errorData);
                Toast("error", "Error fetching profile data");
                navigate("/signin");
            }
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            Toast("error", "Error fetching profile data");
            navigate("/signin");
        }
    };

    const refreshToken = async () => {
        if (refreshing) return; // Prevent multiple refresh attempts simultaneously
        setRefreshing(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh: authTokens?.refresh })
            });
            const data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data);
                localStorage.setItem("authTokens", JSON.stringify(data));
                console.log("Token refreshed successfully");
            } else {
                logoutUser();
                Toast("error", "Session expired. Please log in again");
                navigate("/signin");
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            logoutUser();
            Toast("error", "Failed to refresh token. Please log in again");
            navigate("/signin");
        } finally {
            setRefreshing(false); // Reset refreshing flag
        }
    };

    const updateSubscribe = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/update-subscription/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens?.access}`
                },
                body: JSON.stringify({ subscribed: true })
            });
            if (response.ok) {
                fetchProfileData();
                Toast("success", "Subscription Updated Successfully");
            } else if (response.status === 401 && !refreshing) { // Avoid triggering refresh multiple times
                await refreshToken();
            }else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Failed to update subscription:", error);
            Toast("error", "Failed to Update Subscription");
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
        fetchProfileData
    };

    return (
        <AuthContext.Provider value={ContextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

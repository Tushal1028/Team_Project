import { useContext } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Corrected import
import dayjs from 'dayjs';
import AuthContext from "../content/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const MyAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access); // Corrected function call
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (isExpired) {
            const response = await axios.post(`${baseURL}/token/refresh/`, {
                refresh: authTokens.refresh
            });

            localStorage.setItem("authTokens", JSON.stringify(response.data));
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access)); // Corrected function call

            req.headers.Authorization = `Bearer ${response.data.access}`;
        }

        return req;
    });

    return axiosInstance;
};

export default MyAxios;

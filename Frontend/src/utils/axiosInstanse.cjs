import axios from "axios";
import { BASE_URL } from "./apiPaths.cjs";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "appication/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use (
    (response) =>{
        return response;
    },
    (error) =>{
        // Handle common error globaly
        if(error.response) {
            if(error.response.status === 401) {
                // Redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("server error, Please try again later Error:", error.message)
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeOut, Please try again")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
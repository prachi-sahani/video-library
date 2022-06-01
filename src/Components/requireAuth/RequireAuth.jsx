import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authorization-context";

export function RequireAuth({children}){
    const location = useLocation();
    const { authToken } = useAuth();
    return (
        authToken ? children : <Navigate to="/login" replace state={{from:location}} />
    )
}
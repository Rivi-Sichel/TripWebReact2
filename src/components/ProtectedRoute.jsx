import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    let user = useSelector((state) => state.user.currentUser);
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
};

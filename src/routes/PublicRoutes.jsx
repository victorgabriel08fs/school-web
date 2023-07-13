import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="*" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default PublicRoutes;
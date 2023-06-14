import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="*" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default PublicRoutes;
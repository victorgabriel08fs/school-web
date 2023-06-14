import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "../pages/Login";

const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="*" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default PublicRoutes;
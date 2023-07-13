import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import GradesPage from "../pages/GradesPage";
import GradeListPage from "../pages/GradeListPage";
import LessonsPage from "../pages/LessonsPage";
import UsersPage from "../pages/UsersPage";
import UserPage from "../pages/UserPage";
import UserEditPage from "../pages/UserEditPage";
import useAuthorization from "../hooks/useAuthorization";
import DeniedPage from "../pages/DeniedPage";

const PrivateRoutes = () => {

    const isAdmin = useAuthorization(['Administrador']);
    const isAluno = useAuthorization(['Aluno']);
    const isProfessor = useAuthorization(['Aluno']);

    return (
        <>
            <Routes>
                <Route exact path="*" element={<Navigate to="/" />} />
                <Route exact path="/" element={<DashboardPage />} />
                <Route exact path="/grades" element={<GradesPage />} />
                <Route exact path="/grade/:gradeId/list" element={<GradeListPage />} />
                <Route exact path="/lessons" element={<LessonsPage />} />
                <Route exact path="/users" element={isAdmin ? <UsersPage /> : <DeniedPage />} />
                <Route exact path="/user/:userId" element={<UserPage />} />
                <Route exact path="/user/:userId/edit" element={<UserEditPage />} />
            </Routes>
        </>
    );
}

export default PrivateRoutes;
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Grades from "../pages/Grades";
import GradeList from "../pages/GradeList";
import Lessons from "../pages/Lessons";
import Users from "../pages/Users";
import User from "../pages/User";
import UserEdit from "../pages/UserEdit";

const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="*" element={<Navigate to="/" />} />
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/grades" element={<Grades />} />
                <Route exact path="/grade/:gradeId/list" element={<GradeList />} />
                <Route exact path="/lessons" element={<Lessons />} />
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/user/:userId" element={<User />} />
                <Route exact path="/user/:userId/edit" element={<UserEdit />} />
            </Routes>
        </>
    );
}

export default PrivateRoutes;
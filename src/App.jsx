import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import User from "./pages/User";
import UserEdit from "./pages/UserEdit";
import Grades from "./pages/Grades";
import GradeList from "./pages/GradeList";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/grades" element={<Grades />} />
        <Route exact path="/grade/:gradeId/list" element={<GradeList />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/user/:userId" element={<User />} />
        <Route exact path="/user/:userId/edit" element={<UserEdit />} />
      </Routes>
    </>
  );
}

export default App;

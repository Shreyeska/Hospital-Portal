import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import User from "./pages/User";
import Doctor from "./pages/Doctor";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  const role = auth?.role;

  if (auth.token === null && localStorage.getItem("token")) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            role === "ADMIN" ? (
              <AdminDashboard role={role} />
            ) : role === "USER" ? (
              <User role={role} />
            ) : role === "DOCTOR" ? (
              <Doctor role={role} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

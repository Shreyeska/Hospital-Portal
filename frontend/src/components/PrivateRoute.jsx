import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { role } = useAuth();

  useEffect(() => {
    if (!role) {
      console.log("Unauthorized user");
    }
  }, [role]);

  if (!role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

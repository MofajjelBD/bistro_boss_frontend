import React, { Children } from "react";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import useAuth from "../../hooks/useAuth/useAuth";
import { useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;

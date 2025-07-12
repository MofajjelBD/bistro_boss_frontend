import React from "react";
import useAdmin from "../../../hooks/useAdmin/useAdmin";
import useAuth from "../../../hooks/useAuth/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {isAdmin ? user.displayName : "Back"}
        <sup className="text-sm"> (admin)</sup>
      </h2>
    </div>
  );
};

export default AdminHome;

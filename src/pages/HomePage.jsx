import React from "react";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logOutUser } = useAuth();

  return (
    <div>
      home page
      {user?.fullName}
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
};

export default HomePage;

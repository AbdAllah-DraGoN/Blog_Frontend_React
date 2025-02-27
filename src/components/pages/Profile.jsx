import React from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../../functions/handleUserData";

const Profile = () => {
  const user = getUserData();

  return (
    <div>
      <h1 className="page-header">User Profile</h1>
      <div className="my-container" style={{ textAlign: "center" }}>
        {user ? (
          <div className="current-user-info">
            <img
              src={`http://localhost:8000/${user.image}`}
              alt="User"
              style={{ width: "250px", height: "250px", borderRadius: "50%" }}
            />
            <div
              style={{
                marginTop: "20px",
                fontSize: "20px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              <p>Wellcome, {user.name}</p>
              <p>Your Email: {user.email}</p>
            </div>
          </div>
        ) : (
          <div className="hello-guset">
            Hello Guset,
            <Link to="/register">Register Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

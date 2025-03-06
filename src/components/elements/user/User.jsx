import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./user.css";
import { handleDates } from "../../../functions/handleDates";
import { BASE_URL } from "../../../data";

const Users = ({ user }) => {
  return (
    <div className="user-card">
      <Link to={`/users/profile/${user.id}`}>
        <div>
          <img src={`${BASE_URL}/${user.image}`} alt="User" />
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
          <small>{handleDates(user.created_at)}</small>
        </div>
      </Link>
    </div>
  );
};

export default Users;

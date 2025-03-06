import { useEffect, useState } from "react";
import useGetApi from "../../hooks/useGetApi";
import User from "../elements/user/User";
import "./pages.css";
import Loader from "../elements/loader/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [data, loading, error] = useGetApi("/users?limit=20");
  useEffect(() => {
    data && setUsers(data.data);
    error && console.log(error);
  }, [data, error]);
  return (
    <div className="my-container">
      <h1 className="page-header">All Users</h1>
      <Loader state={loading} />
      <div className="users-container">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;

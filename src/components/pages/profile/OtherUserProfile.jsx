import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import useGetApi from "../../../hooks/useGetApi";
import Loader from "../../elements/loader/Loader";

const OtherUserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [data, loading] = useGetApi(`/users/${id}`);
  useEffect(() => {
    data && setUser(data.data);
  }, [data]);
  return (
    <div className="my-container">
      <Loader state={loading} />
      <div>{user && <Profile user={user} />}</div>
    </div>
  );
};

export default OtherUserProfile;

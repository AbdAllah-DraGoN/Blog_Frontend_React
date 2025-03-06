import React from "react";
import Profile from "./Profile";
import { getCurrentUser } from "../../../functions/handleUserData";

const CurrentUserProfile = () => {
  const user = getCurrentUser();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default CurrentUserProfile;

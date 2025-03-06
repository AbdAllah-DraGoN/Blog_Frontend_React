import { useParams } from "react-router-dom";
import { checkIfCurrentUser } from "../../../functions/handleUserData";
import OtherUserProfile from "./OtherUserProfile";
import CurrentUserProfile from "./CurrentUserProfile";

const Profile = () => {
  const { id } = useParams();

  if (checkIfCurrentUser(id) || !id) {
    return <CurrentUserProfile />;
  } else {
    return <OtherUserProfile id={id} />;
  }
};

export default Profile;

import axios from "axios";
import { MAIN_API_URL } from "../data";

const getCurrentUser = () => {
  const data = localStorage.getItem("MY_USER_DATA");
  if (!data) {
    return null;
  }
  const userData = JSON.parse(data);
  return userData;
};

const saveUser = (data) => {
  const userData = JSON.stringify(data);
  localStorage.setItem("MY_USER_DATA", userData);
};

const deleteCurrentUserData = () => {
  localStorage.removeItem("MY_USER_DATA");
};

const checkIfCurrentUser = (id) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }
  if (+currentUser.id === +id) {
    return true;
  } else {
    return false;
  }
};

export { getCurrentUser, saveUser, deleteCurrentUserData, checkIfCurrentUser };

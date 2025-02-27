const getUserData = () => {
  const data = localStorage.getItem("MY_USER_DATA");
  if (!data) {
    return null;
  }
  const userData = JSON.parse(data);
  return userData;
};

const saveUserData = (data) => {
  const userData = JSON.stringify(data);
  localStorage.setItem("MY_USER_DATA", userData);
};

const deleteUserData = () => {
  localStorage.removeItem("MY_USER_DATA");
};

export { getUserData, saveUserData, deleteUserData };

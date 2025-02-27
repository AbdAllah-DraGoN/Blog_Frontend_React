const getToken = () => {
  const token = localStorage.getItem("MY_USER_TOKEN");
  if (!token) {
    return null;
  }
  return token;
};

const saveToken = (token) => {
  localStorage.setItem("MY_USER_TOKEN", token);
};

const deleteToken = () => {
  localStorage.removeItem("MY_USER_TOKEN");
};

export { getToken, saveToken, deleteToken };

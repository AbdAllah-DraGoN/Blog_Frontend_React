import { useState } from "react";
import { handleInputsChange, validateEmail } from "../../functions/handleForms";
import axios from "axios";
import { toast } from "react-toastify";
import { MAIN_API_URL } from "../../data";
import { saveToken } from "../../functions/handleTokens";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../../functions/handleUserData";

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    handleInputsChange(e, formValues, setFormValues);
  };
  const handleSubmitBtnClick = () => {
    // validate inputs
    if (!validateEmail(formValues.email)) {
      return;
    }

    const loading = toast.info("Loading...", {
      autoClose: false,
      closeOnClick: false,
    });
    axios
      .post(`${MAIN_API_URL}/login`, formValues, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        saveToken(res.data.token);
        saveUserData(res.data.data);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((rej) => {
        console.log(rej);
        toast.error(rej.response.data.message);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };

  return (
    <div>
      <div className="container">
        <h1 className="page-header"> login </h1>
        <div className="my-form login-form">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            className="email"
            id="email"
            placeholder="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            className="password"
            id="password"
            placeholder="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <button className="submit" onClick={handleSubmitBtnClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

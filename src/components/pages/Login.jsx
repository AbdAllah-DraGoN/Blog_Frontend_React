import { useState } from "react";
import { handleInputsChange, validateEmail } from "../../functions/handleForms";
import axios from "axios";
import { toast } from "react-toastify";
import { MAIN_API_URL } from "../../data";
import { saveToken } from "../../functions/handleTokens";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../functions/handleUserData";
import axiosApiRequest from "../../functions/axiosApiRequest";

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

    axiosApiRequest(
      "post",
      "/login", // url
      formValues, // body Parameters
      {}, // additionals headeres
      (d) => {
        saveToken(d.token);
        saveUser(d.data);
        navigate("/");
      } // function run in "then()"
    );
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

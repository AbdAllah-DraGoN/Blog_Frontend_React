import { useState } from "react";
import { handleInputsChange } from "../../functions/handleForms";
import axios from "axios";
import { toast } from "react-toastify";
import { MAIN_API_URL } from "../../data";

const Login = () => {
  // const MAIN_API_URL = "http://127.0.0.1:8000/api";
  const [data, setData] = useState(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    handleInputsChange(e, formValues, setFormValues);
  };
  const handleSubmitBtnClick = () => {
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
        setData(res.data);
        if (data.message) {
          toast.success(res.data.message);
        } else {
          console.log("have data error");
        }
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

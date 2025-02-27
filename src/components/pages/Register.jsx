import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { handleInputsChange, validateEmail } from "../../functions/handleForms";
import { alertErrorsFromObject } from "../../functions/handleAlerts";
import { MAIN_API_URL } from "../../data";
import "./pages.css";

const Register = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: null,
  });
  const handleInputChange = (e) => {
    handleInputsChange(e, formValues, setFormValues);
  };
  const handleSubmitBtnClick = () => {
    // validate inputs
    let isValid = true;
    isValid = validateEmail(formValues.email);
    if (3 > formValues.name.length || formValues.name.length > 25) {
      toast.error("Name must be between 3 and 25 characters");
      isValid = false;
    }
    if (!formValues.image) {
      toast.error("You must upload a photo");
      isValid = false;
    }
    if (formValues.password.length < 6) {
      toast.error("Password must be minimum 6 characters");
      isValid = false;
    }
    if (formValues.password !== formValues["password_confirmation"]) {
      toast.error("Password and password confirmation must match");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    // send request
    const form = new FormData();

    for (const input in formValues) {
      form.append(input, formValues[input]);
    }
    const loading = toast.info("Loading...", {
      autoClose: false,
      closeOnClick: false,
    });
    axios
      .post(`${MAIN_API_URL}/register`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
        toast.success(res.data.message);
      })
      .catch((rej) => {
        // console.log(rej);
        const errors = rej.response.data.errors;

        if (errors) {
          alertErrorsFromObject(errors);
        } else {
          console.log("you have a error in the error");
        }
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };

  return (
    <div>
      <div className="container">
        <h1 className="page-header"> Register </h1>
        <div className="my-form register-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="name"
            id="name"
            placeholder="name"
            onChange={handleInputChange}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            className="email"
            id="email"
            placeholder="email"
            onChange={handleInputChange}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            className="password"
            id="password"
            placeholder="password"
            onChange={handleInputChange}
          />
          <label htmlFor="password-confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password-confirmation"
            className="password-confirmation"
            id="password_confirmation"
            placeholder="password-confirmation"
            onChange={handleInputChange}
          />
          <label htmlFor="image">Your Photo</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            name="image"
            className="image"
            id="image"
            // for handle file input (image input)
            onChange={(e) => {
              setFormValues({
                ...formValues,
                [e.target.id]: e.target.files[0],
              });
            }}
          />
          <button className="submit" onClick={handleSubmitBtnClick}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

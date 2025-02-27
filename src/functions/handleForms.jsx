import { toast } from "react-toastify";

export const handleInputsChange = (e, value, setValue) => {
  setValue({
    ...value,
    [e.target.id]: e.target.value,
  });
};

export const handleSubmitBtnsClick = (value) => {
  console.log(value);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email) && email.length <= 50) {
    return true;
  }
  toast.error("Email must be valid");
  return false;
};

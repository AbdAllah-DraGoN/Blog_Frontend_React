import { toast } from "react-toastify";
import { MAIN_API_URL } from "../data";
import axios from "axios";
import { getToken } from "./handleTokens";
import { alertErrorsFromObject } from "./handleAlerts";

const axiosApiRequest = (
  type = "post", // Request Type
  url, // Api Url
  data, // body Parameters
  headers = {
    // additionals headeres
  },
  resFunctions = (d) => {
    // function run in "then()"
  },
  rejFunctions = (d) => {
    // function run in "catch()"
  }
) => {
  //
  // I Will Change this Loading Way
  const loading = toast.info("Loading...", {
    autoClose: false,
    closeOnClick: false,
  });

  headers.Accept = "application/json";

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const payload = type === "get" || type === "delete" ? { headers } : data;
  const config = type === "get" || type === "delete" ? undefined : { headers };

  axios[type](MAIN_API_URL + url, payload, config)
    .then((res) => {
      // console.log(res);
      resFunctions(res.data);
      toast.success(res.data.message);
    })
    .catch((rej) => {
      console.log(rej);

      rejFunctions(rej.response);

      if (rej.response.data) {
        if (rej.response.data.errors) {
          alertErrorsFromObject(rej.response.data.errors);
        } else if (rej.response.data.message) {
          toast.error(rej.response.data.message);
        }
      }
    })
    .finally(() => {
      toast.dismiss(loading);
    });
};

export default axiosApiRequest;

// const loading = toast.info("Loading...", {
//   autoClose: false,
//   closeOnClick: false,
// });
// axios
//   .post(`${MAIN_API_URL}/register`, form, {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//     },
//   })
//   .then((res) => {
//     console.log(res);
//     navigate("/login");
//     toast.success(res.data.message);
//   })
//   .catch((rej) => {
//     // console.log(rej);
//     const errors = rej.response.data.errors;
//     if (errors) {
//       alertErrorsFromObject(errors);
//     } else {
//       console.log("you have a error in the error");
//     }
//   })
//   .finally(() => {
//     toast.dismiss(loading);
//   });

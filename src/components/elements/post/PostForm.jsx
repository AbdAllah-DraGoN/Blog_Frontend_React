import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./post.css";
import { handleInputsChange } from "../../../functions/handleForms";
import { alertErrorsFromObject } from "../../../functions/handleAlerts";
import { MAIN_API_URL } from "../../../data";
import { getToken } from "../../../functions/handleTokens";
import useGetApi from "../../../hooks/useGetApi";

const PostForm = () => {
  const userToken = getToken();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [data, loading, error] = useGetApi("/categories");
  useEffect(() => {
    data && setCategories(data.data);
    error && console.log(error);
  }, [data, error]);

  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    category_id: "",
    image: null,
  });
  const handleInputChange = (e) => {
    handleInputsChange(e, formValues, setFormValues);
  };
  const handleSubmitBtnClick = () => {
    // validate inputs
    let isValid = true;
    if (3 > formValues.title.length || formValues.title.length > 25) {
      toast.error("title must be between 3 and 25 characters");
      isValid = false;
    }
    if (formValues.body.length < 5) {
      toast.error("body must be minimum 5 characters");
      isValid = false;
    }
    if (formValues.category_id == 0) {
      toast.error("Please Choose Category ");
      isValid = false;
    }
    if (!formValues.image) {
      toast.error("You must upload a photo");
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
    console.log(Array.from(form));

    const loading = toast.info("Loading...", {
      autoClose: false,
      closeOnClick: false,
    });
    axios
      .post(`${MAIN_API_URL}/posts`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        // navigate("/user/posts");
        toast.success(res.data.message);
      })
      .catch((rej) => {
        console.log(rej);

        // const errors = rej.response.data.errors;
        // if (errors) {
        //   alertErrorsFromObject(errors);
        // } else {
        //   console.log("you have a error in the error");
        // }
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };

  return (
    <div>
      <div className="my-form post-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="title"
          id="title"
          placeholder="title"
          onChange={handleInputChange}
        />

        <label htmlFor="body">body</label>
        <input
          type="text"
          name="body"
          className="body"
          id="body"
          placeholder="body"
          onChange={handleInputChange}
        />
        <label htmlFor="image">Photo</label>
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category_id"
            className="category"
            onChange={handleInputChange}
            defaultValue={0}
          >
            <option value={0} disabled>
              Select Category
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <button className="submit" onClick={handleSubmitBtnClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostForm;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./post.css";
import { handleInputsChange } from "../../../functions/handleForms";
import useGetApi from "../../../hooks/useGetApi";
import ImageUploader from "../../image/ImageUploader";
import axiosApiRequest from "../../../functions/axiosApiRequest";

const PostForm = ({ post = null }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
    category_id: 0,
    image: null,
  });

  const [categoriesData, categoriesLoading] = useGetApi("/categories");

  useEffect(() => {
    categoriesData && setCategories(categoriesData.data);
  }, [categoriesData]);

  useEffect(() => {
    if (post) {
      setFormValues({
        title: post.title,
        body: post.body,
        category_id: post.category.id,
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    handleInputsChange(e, formValues, setFormValues);
  };

  const handleSubmitBtnClick = () => {
    // validate inputs
    let isValid = true;
    if (
      (3 > formValues.title.length || formValues.title.length > 25) &&
      !post
    ) {
      toast.error("title must be between 3 and 25 characters");
      isValid = false;
    }
    if (formValues.body.length < 5 && !post) {
      toast.error("body must be minimum 5 characters");
      isValid = false;
    }
    if (formValues.category_id == 0 && !post) {
      toast.error("Please Choose Category ");
      isValid = false;
    }
    if (!formValues.image && !post) {
      toast.error("You must upload a photo");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    // send request
    const form = new FormData();

    for (const input in formValues) {
      if (formValues[input]) {
        form.append(input, formValues[input]);
      }
    }

    if (post) {
      form.append("_method", "PUT");
    }
    // console.log(Array.from(form));
    // return;

    axiosApiRequest(
      "post",
      [post ? `/posts/${post.id}` : "/posts"], // url
      form, // body Parameters
      {}, // additionals headeres
      (d) => {
        // console.log(d);
        navigate("/users/profile");
      } // function run in "then()"
    );
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
          value={formValues.title}
          onChange={handleInputChange}
        />
        <label htmlFor="body">body</label>
        <input
          type="text"
          name="body"
          className="body"
          id="body"
          placeholder="body"
          value={formValues.body}
          onChange={handleInputChange}
        />
        <label htmlFor="image">Photo</label>
        <div className="image-input-box">
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
          <ImageUploader file={formValues.image} image={post?.image} />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category_id"
            className="category"
            onChange={handleInputChange}
            value={formValues.category_id}
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

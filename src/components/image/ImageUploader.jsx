import { useEffect, useState } from "react";

const ImageUploader = ({ file, image = null }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (image) {
      setImagePreview(image);
    }
  }, [file, image]);

  return (
    <div>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ maxWidth: "200px", maxHeight: "200px", margin: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;

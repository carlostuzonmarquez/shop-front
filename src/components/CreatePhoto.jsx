import { useState } from "react";
import Config from "../Config";
import axios from "axios";
import { DeleteIcon, DeleteXIcons } from "./Icons";

export default function CreatePhoto({ productId = null, handleNewPhoto }) {
  const [preview, setPreview] = useState("https://placehold.co/100");

  const handlePhotochange = (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (productId !== null) {
      formData.append("productId", productId);
    }
    axios
      .post(Config.BACKEND_URL + "photo", formData, {
        "Content-type": "multipart/form-data",
      })
      .then((res) => {
        setPreview(res.data.preview);
        handleNewPhoto(res.data.filename);
      });
  };
  const handleDelete = () => {
    setPreview(null);
  };
  return (
    <>
      <img src={preview} alt="" />
      <label>Seleccionar Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotochange}
        style={{ display: "none" }}
      />

      <button
        onClick={(e) => {
          e.target.previousElementSibling.click();
        }}
      >
        subir Imagen
      </button>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </>
  );
}

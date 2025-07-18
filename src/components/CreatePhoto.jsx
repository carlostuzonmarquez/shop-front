import { useState } from "react";
import Config from "../Config";
import axios from "axios";
import { DeleteIcon, DeleteXIcons } from "./Icons";

export default function CreatePhoto({
  setPhotos,
  photos,
  componentIndex,
  photosComponent,
  setPhotoComponent,
}) {
  const [preview, setPreview] = useState("https://placehold.co/100");
  const [uploadButtonVisible, setUploadButtonVisible] = useState(true);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const handlePhotochange = (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${Config.BACKEND_URL}photo`, formData, {
        "Content-type": "multipart/form-data",
      })
      .then((res) => {
        setPreview(res.data.photo);
        setPhotos([...photos, res.data.filename]);
        setUploadButtonVisible(false);
        setUploadedPhoto(res.data.filename);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`${Config.BACKEND_URL}photo/by-filename/${uploadedPhoto}`)
      .then((res) => {
        setPhotos(photos.filter((filename) => filename !== uploadedPhoto));
        setPhotoComponent(
          photosComponent.filter((_, index) => componentIndex !== index)
        );
        setPreview(null);
      });
  };
  return (
    <>
      <img src={preview} alt="" style={{ width: "250px" }} />
      <label>Seleccionar Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotochange}
        style={{ display: "none" }}
      />
      {uploadButtonVisible === true && (
        <button
          onClick={(e) => {
            e.target.previousElementSibling.click();
          }}
        >
          subir Imagen
        </button>
      )}
      {uploadButtonVisible === false && (
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      )}
    </>
  );
}

import axios from "axios";
import Config from "../Config";

export default function EditNewPhoto({
  productId,
  setPhotos,
  setNewPhoto,
  photos,
}) {
  const handlePhotochange = (event) => {
    let file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(Config.BACKEND_URL + "photo/" + productId, formData, {
        "Content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res);
        setPhotos([...photos, res.data]);
        setNewPhoto(false);
      });
  };
  return (
    <>
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
    </>
  );
}

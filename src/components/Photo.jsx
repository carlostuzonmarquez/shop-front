import axios from "axios";
import Config from "../Config";
import { DeleteIcon } from "./Icons";

export default function Photo({ id, path, photos, setPhotos }) {
  const handleDeletePhotos = () => {
    axios.delete(Config.BACKEND_URL + "photo/" + id).then(() => {
      const updatedPhotos = photos.filter((photo) => photo.id !== id);
      setPhotos(updatedPhotos);
    });
  };

  return (
    <>
      <img src={Config.PHOTOS_URL + path} alt="" style={{width:"200px"}}/>
      <button onClick={handleDeletePhotos}>
        <DeleteIcon />
      </button>
    </>
  );
}

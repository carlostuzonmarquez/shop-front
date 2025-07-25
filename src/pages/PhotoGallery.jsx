import Config from "../Config";

export default function PhotoGallery({ photos }) {
  const imageclick = (event) => {
    const image = event.target;
    const imageUrl = image.src;
    document.getElementById("mainImage").src = imageUrl;
    document
      .getElementsByClassName("active_image")[0]
      .classList.remove("active_image");
    image.classList.add("active_image");
  };

  if (!photos) {
    return <div>no product found</div>;
  }
  return (
    <div className="product-gallery">
      <div className="main-image">
        <img
          src={Config.PHOTOS_URL + photos.Photos[0].path}
          alt="Producto 1"
          id="mainImage"
        />
      </div>
      <div className="thumbnails">
        {photos.Photos.map((photo, index) => {
          return (
            <img
              key={photo.id}
              src={Config.PHOTOS_URL + photo.path}
              alt="Miniatura 1"
              onClick={imageclick}
              className={index === 0 ? "active_image" : ""}
            />
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "../componentesCSS/Slider.css";

const desktopImages = [
  "https://placehold.co/1200x401",
  "https://placehold.co/1200x402",
  "https://placehold.co/1200x403",
];

const mobileImages = [
  "https://placehold.co/300x403",
  "https://placehold.co/300x404",
  "https://placehold.co/300x405",
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="banner">
      <div className="slider">
        <img src={images[index]} alt={`Imagen ${index + 1}`} />
      </div>
    </div>
  );
}

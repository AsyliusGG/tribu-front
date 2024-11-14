import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = ({ is_superuser, is_staff }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState([...images]);

  // Cargar imágenes del servidor al montar el componente
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get("http://localhost:8000/carrusel/api/v1/carrusel/");
        setImages(response.data.map((item) => item.foto));
        setNewImages(response.data.map((item) => item.foto));
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    }
    fetchImages();
  }, []);

  // Avanzar al siguiente slide automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cada 3 segundos

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (index, event) => {
    const updatedImages = [...newImages];
    updatedImages[index] = URL.createObjectURL(event.target.files[0]);
    setNewImages(updatedImages);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      newImages.forEach((image, index) => {
        if (image !== images[index]) {
          formData.append(`slide${index + 1}`, image);
        }
      });
      await axios.post("/api/carrusel/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages(newImages);
      setIsEditing(false);
      alert("Images updated successfully!");
    } catch (error) {
      console.error("Error saving images:", error);
      alert("Failed to update images.");
    }
  };

  return (
    <div className="w-screen mx-auto">
      <div className="relative w-full">
        <div className="overflow-hidden relative h-[93vh] w-screen">
          {images.map((src, index) => (
            <div
              key={index}
              className={`${
                currentIndex === index ? "block" : "hidden"
              } duration-700 ease-in-out w-screen`}
            >
              <img
                src={src}
                className="block absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Botón Anterior */}
        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </span>
        </button>

        {/* Botón Siguiente */}
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </span>
        </button>

        {/* Botón Editar para el Superusuario o Staff */}
        {(is_superuser || is_staff) && (
          <div className="absolute top-5 right-5 z-40">
            <button
              onClick={handleEditToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Editar Carrusel
            </button>
          </div>
        )}

        {/* Formulario de edición (visible solo si isEditing es true) */}
        {isEditing && (is_superuser || is_staff) && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Editar Carrusel</h2>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 font-medium">
                  Slide {index + 1}:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="mt-1 block w-full"
                />
              </div>
            ))}
            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

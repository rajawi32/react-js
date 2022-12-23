import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const Images = () => {
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [images, setImages] = useState([]);
  const getImages = async (id) => {
    const { data } = await axios.get(`${baseUrl}/tv/${id}/images`, {
      params: {
        api_key: apiKey,
      },
    });
    return data.backdrops;
  };
  useEffect(() => {
    const fetchApi = async () => {
      setImages(await getImages(id));
    };
    fetchApi();
  }, [id]);

  const imagesList = images.map((img) => {
    return (
      <div className="img">
        <img
          src={`https://image.tmdb.org/t/p/original${img.file_path}`}
          alt="#"
        />{" "}
      </div>
    );
  });

  return (
    <>
      <div className="container-image">
        <button
          onClick={() => {
            navigateTo(`/${id}`);
          }}
          className="back-btn"
        >
          BACK
        </button>
        {imagesList}
      </div>
    </>
  );
};

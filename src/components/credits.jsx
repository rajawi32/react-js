import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const Credits = () => {
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [credits, setCredits] = useState([]);
  const getCredits = async (id) => {
    const { data } = await axios.get(`${baseUrl}/tv/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    return data.cast;
  };
  useEffect(() => {
    const fetchApi = async () => {
      setCredits(await getCredits(id));
    };
    fetchApi();
  }, [id]);

  const creditsList = credits.map((credit) => {
    return (
      <div className="credit">
        <img
          src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
          alt="#"
        />{" "}
      </div>
    );
  });

  return (
    <>
      <button
        onClick={() => {
          navigateTo(`/${id}`);
        }}
      >
        BACK
      </button>
      <div className="container-image">{creditsList}</div>
    </>
  );
};

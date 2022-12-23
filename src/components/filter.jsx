import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const FilterByGenre = ({ genres }) => {
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const [series, setSeries] = useState([]);
  const getSeries = async (genreId) => {
    const { data } = await axios.get(`${baseUrl}/discover/tv`, {
      params: {
        api_key: apiKey,
        with_genres: genreId,
      },
    });
    return data.results;
  };
  const handleClick = async (genreId) => {
    setSeries(await getSeries(genreId));
  };
  useEffect(() => {
    const fetchApi = async () => {
      setSeries(await getSeries(10765));
    };
    fetchApi();
  }, []);
  const genresList = genres.map((genre) => {
    return (
      <button key={genre.id} onClick={() => handleClick(genre.id)}>
        {genre.name}
      </button>
    );
  });

  const seriesList = series.map((serie) => {
    return (
      <>
        <img src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`} />
        <Link to={`/${serie.id}`}>voir Detail</Link>
      </>
    );
  });
  return (
    <>
      <div className="container-genres">{genresList}</div>
      <div className="container-image">{seriesList}</div>
    </>
  );
};

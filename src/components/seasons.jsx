import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {BsFillStarFill} from "react-icons/bs"
import axios from "axios";
export const Seasons = () => {
  const { id, seasonId } = useParams();
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const navigateTo = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const getSeasons = async (id, seasonNbr) => {
    const { data } = await axios.get(
      `${baseUrl}/tv/${id}/season/${seasonNbr}`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    return data;
  };
  useEffect(() => {
    const fetchApi = async () => {
      setSeasons(await getSeasons(id, seasonId));
      console.log(seasons);
    };
    fetchApi();
  }, [id, seasonId]);

  let episodes = [];
  episodes = seasons.episodes;
  let episodesList;
  if (episodes) {
    episodesList = episodes.map((ep) => {
      return (
        <div className="episode">
          <img
            src={`https://image.tmdb.org/t/p/original${ep.still_path}`}
            alt=""
          />
          <div className="name">
            <span>Name</span>
            {ep.name}
          </div>
          <div className="number-ep">
            <span>episode number</span>
            {ep.episode_number}
          </div>
          <div className="rate">
            <span>rate</span>
            {ep.vote_average}
            <BsFillStarFill />
          </div>
          <div className="duree">
            <span>duree</span>
            {ep.runtime}min
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container-seasons">
      <button
        className="back-btn"
        onClick={() => {
          navigateTo(`/${id}`);
        }}
      >
        BACK
      </button>
      <div className="season-guide">
        <div className="season-number">{seasons.name}</div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${seasons.poster_path}`}
            alt="#"
          />
        </div>
        <div className="overview">{seasons.overview}</div>
        <div className="release-date">{seasons.air_date}</div>
      </div>
      <div className="episodes">{episodesList}</div>
    </div>
  );
};

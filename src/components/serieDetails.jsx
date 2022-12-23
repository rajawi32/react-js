import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill, BsFillStarFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarTwo } from "./navbar-2";
export const Details = () => {
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [serieDetail, setSerieDetail] = useState([]);
  const getDetails = async (id) => {
    const { data } = await axios.get(`${baseUrl}/tv/${id}`, {
      params: {
        api_key: apiKey,
      },
    });
    return data;
  };
  useEffect(() => {
    const fetchApi = async () => {
      setSerieDetail(await getDetails(id));
      document.querySelector("header").style.display = "none";
    };
    fetchApi();
  }, [id]);
  let genres = [];
  genres = serieDetail.genres;
  let genresList;
  if (genres) {
    genresList = genres.map((genre) => {
      return <button key={genre.id}>{genre.name}</button>;
    });
  }
  let creator = [];
  creator = serieDetail.created_by;
  let creatorName;
  if (creator) {
    creatorName = creator.slice(0, 1).map((creator, index) => {
      if (creator.name !== "") {
        return (
          <div className="creator" key={index}>
            <span>Creator</span>
            {creator.name}
          </div>
        );
      }
    });
  }
  let ProdCompanies = [];
  ProdCompanies = serieDetail.production_companies;
  let prodCompaniesList;
  if (ProdCompanies) {
    prodCompaniesList = ProdCompanies.map((companie, index) => {
      if (companie.logo_path != null) {
        return (
          <div className="companies-box">
            <div className="companie-name" key={index}>
              {companie.name}
            </div>
            <div className="companie-logo">
              <img
                src={`https://image.tmdb.org/t/p/original${companie.logo_path}`}
                alt="#"
                height={40}
              />
            </div>
          </div>
        );
      }
    });
  }
  let country = [];
  country = serieDetail.production_countries;
  let countryName;
  if (country) {
    countryName = country.slice(0, 1).map((country) => {
      return <div className="country-name">{country.name}</div>;
    });
  }
  let seasons = [];
  seasons = serieDetail.seasons;
  let seasonsCard;
  if (seasons) {
    seasonsCard = seasons.map((season) => {
      if (season.poster_path !== null) {
        return (
          <div className="card-season">
            <img
              src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
              alt="#"
            />
            <div className="season_number">
              Season Number:
              <span>{season.season_number}</span>
            </div>
            <div className="season_episode_count">
              Number Episodes:
              <span>{season.episode_count}</span>
            </div>
            <Link
              to={`/${id}/${season.season_number}`}
              className="season-detail-btn"
            >
              <AiFillEye />
              View
            </Link>
          </div>
        );
      }
    });
  }

  return (
    <>
      <NavbarTwo id={id} />
      <div className="container-serie-details">
        <button
          onClick={() =>
            navigateTo(
              "/",
              (document.querySelector("header").style.display = "block")
            )
          }
          className="back-btn"
        >
          <BsFillArrowLeftCircleFill />
          back
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${serieDetail.backdrop_path}`}
          alt="#"
          className={
            serieDetail.backdrop_path != null ? "img-serie" : "undefind"
          }
        />
        <div className="serie-details">
          <div className="serie-name">
            <span>Serie Name</span> {serieDetail.name}
          </div>
          <div className="genres">
            <span>Genres</span>
            {genresList}
          </div>
          {/* <div className="created"> */}
          {/* <span>Creator</span> */}
          {creatorName}
          {/* </div> */}
          <div className="release-date">
            <span>Release Date</span>
            {serieDetail.first_air_date}
          </div>
          <div className="number-seasons">
            <span>Number Of Seasons</span>
            {serieDetail.number_of_seasons}
          </div>
          <div className="number-episodes">
            <span>Number Of Episodes</span>
            {serieDetail.number_of_episodes}
          </div>
          <div className="overview">
            <span>Overview</span>
            {serieDetail.overview}
          </div>
          <div className="rating">
            <span>Rating</span>
            {serieDetail.vote_average}
            <BsFillStarFill />
          </div>
          <div className="popularity">
            <span>Popularity</span>
            {serieDetail.popularity}
          </div>
          <div className="companies">
            <span>Companies</span>
            {prodCompaniesList}
          </div>
          <div className="country">
            <span>Country</span>
            {countryName}
          </div>
        </div>
        <div className="seasonsCard">{seasonsCard}</div>
      </div>
    </>
  );
};

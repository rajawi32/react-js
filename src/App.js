import "./App.css";
import React, { useEffect } from "react";
import { Navbar } from "./components/navbar";
import { Home } from "./components/Home";
import { Images } from "./components/images";
import { Credits } from "./components/credits";
import { Seasons } from "./components/seasons";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Details } from "./components/serieDetails";
import { useState } from "react";
import { FilterByGenre } from "./components/filter";
function App() {
  const [series, setSeries] = useState([]);
  const [value, setValue] = useState(1);
  const [genres, setGenres] = useState([]);
  const popular = "/tv/popular";
  const apiKey = "0b7899ac2c84a08c907af6b89976e920";
  const baseUrl = "https://api.themoviedb.org/3";
  const getSeriesPopular = async (val, type) => {
    const { data } = await axios.get(`${baseUrl}${type}`, {
      params: {
        api_key: apiKey,
        page: val,
        language: "ar-SA",
      },
    });
    const updateData = data.results.map((serie) => ({
      id: serie.id,
      name: serie.name,
      poster_path: serie.poster_path,
      overview: serie.overview,
    }));
    return updateData;
  };
  const searchSerie = async (query) => {
    const { data } = await axios.get(`${baseUrl}/search/tv`, {
      params: {
        api_key: apiKey,
        query: query,
      },
    });
    const updateData = data.results.map((serie) => ({
      name: serie.name,
      poster_path: serie.poster_path,
      overview: serie.overview,
      id: serie.id,
    }));
    return updateData;
  };
  const getGenres = async () => {
    const { data } = await axios.get(`${baseUrl}/genre/tv/list`, {
      params: {
        api_key: apiKey,
      },
    });
    return data.genres;
  };
  useEffect(() => {
    const fetchSeries = async () => {
      setSeries(await getSeriesPopular(value, popular));
      setGenres(await getGenres());
    };
    fetchSeries();
  }, [value]);
  return (
    <>
      <Navbar search={searchSerie} setSearch={setSeries} />
      <Routes>
        <Route
          path="/"
          element={<Home series={series} value={value} setValue={setValue} />}
        />
        <Route path="filter" element={<FilterByGenre genres={genres} />} />
        <Route path=":id" element={<Details />} />
        <Route path="/images/:id" element={<Images />} />
        <Route path="/credits/:id" element={<Credits />} />
        <Route path="/:id/:seasonId" element={<Seasons />} />
      </Routes>
    </>
  );
}
export default App;

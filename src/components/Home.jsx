import React from "react";
import { Serie } from "./serie";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
export const Home = ({ series, value, setValue }) => {
  return (
    <>
      <div className="container-series">
        <div className="row-prev-next">
          <button
            className={value <= 1 ? "disabled prev" : "prev"}
            onClick={() => setValue((prev) => prev - 1)}
          >
            <BsFillArrowLeftSquareFill />
            prev
          </button>
          <span className="value-page">{value}</span>
          <button className="next" onClick={() => setValue((prev) => prev + 1)}>
            <BsFillArrowRightSquareFill />
            next
          </button>
        </div>
        {series.map((serie) => (
          <Serie serie={serie} key={serie.id} />
        ))}
      </div>
    </>
  );
};

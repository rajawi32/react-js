import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
export const Serie = ({ serie }) => {
  if (serie.poster_path !== null) {
    return (
      <>
        <div className="card" id={serie.id}>
          <img
            src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
            alt={serie.name}
          />
          <div className="title">{serie.name}</div>
          <Link className="detail-btn" to={`/${serie.id}`}>
            <AiFillEye /> View Detail
          </Link>
        </div>
      </>
    );
  }
};

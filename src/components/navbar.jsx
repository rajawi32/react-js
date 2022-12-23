import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
export const Navbar = ({ search, setSearch }) => {
  return (
    <header>
      <div className="search-container">
        <div className="search-col">
          <input
            className="input-search"
            type="text"
            placeholder="Search Movies Here ...."
            onChange={async (e) => setSearch(await search(e.target.value))}
          />
          <button className="search-icon">
            <BsSearch />
          </button>
        </div>
        <div className="menu">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="Filter">Filter</NavLink>
        </div>
      </div>
    </header>
  );
};

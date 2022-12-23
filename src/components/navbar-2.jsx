import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
export const NavbarTwo = ({ id }) => {
  return (
    <nav>
      <ul className="dropdown-list">
        <li className="menu-detail">
          <button>
            <FaChevronDown />
            More Details
          </button>
          <ul className="sub-menu">
            {/* <NavLink to={`/seasons/${id}`}>Seasons</NavLink> */}
            <NavLink to={`/images/${id}`}>Images</NavLink>
            <NavLink to={`/credits/${id}`}>Credits</NavLink>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

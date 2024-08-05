import React from "react";
import { NavLink } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="navbar">
        <div className="logo">
          <p>CryptoBucks</p>
          <FaEthereum color="orange" size={25} />
        </div>

        <div className="pages">
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { color: "orange" } : { color: "gold" }
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exchanges"
                style={({ isActive }) =>
                  isActive ? { color: "orange" } : { color: "gold" }
                }
              >
                Exchanges
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coins"
                style={({ isActive }) =>
                  isActive ? { color: "orange" } : { color: "gold" }
                }
              >
                Coins
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div className="navbar">
    //   <div className="logo">
    //     <h1>CryptoBucks</h1>
    //     <FaEthereum color="orange" size={25} />
    // </div>
    // <div className="pages">
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/exchanges">Exchanges</Link>
    //     </li>
    //     <li>
    //       <Link to="/coins">Coins</Link>
    //     </li>
    //   </ul>
    // </div>
    // </div>
  );
};

export default Header;

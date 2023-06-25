import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="p-2 bg-base-100" to={`/`}>
              Home
            </Link>
          </li>
          <li>
            <Link className="ml-2 p-2 bg-base-100" to={`about`}>
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={`mokkogen`}>Mokkogen</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Manage</summary>
              <ul className="z-10 p-4 bg-base-100 shadow-lg shadow-gray-500">
                <li>
                  <Link to={`manage/notes`}>Notes</Link>
                </li>
                <li>
                  <Link to={`manage/mokkos`}>Mokkos</Link>
                </li>
                <li>
                  <Link to={`manage/settings`}>Settings</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

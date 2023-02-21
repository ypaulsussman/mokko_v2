import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="p-2 bg-base-100" to={`/`}>
          Home
        </Link>
        <Link className="ml-2 p-2 bg-base-100" to={`about`}>
          About
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={`mokkogen`}>Mokkogen</Link>
          </li>
          <li tabIndex={0}>
            <a>
              Manage
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
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
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

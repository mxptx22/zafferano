import React from "react";

export function Navbar() {
  return (
    <>
      <div className="navbar bg-primary-focus text-primary-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Zafferano</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Diary</a>
            </li>
            <li>
              <a>Saved</a>
            </li>
            <li>
              <a>Discover</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

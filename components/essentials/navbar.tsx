import React from "react";

export function Navbar() {
  return (
    <>
      <div className="navbar bg-primary-focus text-primary-content px-6">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            Zafferano
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Diary</a>
            </li>
            {/* Good things come to those who wait */}
            {/* <li>
              <a>Saved</a>
            </li> */}
            {/* <li>
              <a>Discover</a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

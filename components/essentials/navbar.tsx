import React, { useRef } from "react";
import { LogoTextual as Logo } from "./logo";

export function Navbar() {
  const menuRef: any = useRef();

  // FIXME Some animation would be welcome
  const handleMenu = () => {
    if (menuRef.current.style.display === "flex") {
      menuRef.current.style.display = "none";
      menuRef.current.style.opacity = 0.25;
    } else {
      menuRef.current.style.display = "flex";
      menuRef.current.style.opacity = 1;
    }
  };

  return (
    <>
      <div className="fixed z-20 w-full flex flex-col">
        <div className="navbar bg-primary-focus text-primary-content md:px-6">
          <div className="flex-1">
            <a
              href="/"
              className="btn btn-ghost normal-case text-xl h-full flex justify-center items-center">
              <Logo />
            </a>
          </div>
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => {
                handleMenu();
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full hidden justify-center" ref={menuRef}>
          <ul className="menu menu-horizontal rounded-lg bg-base-300 text-base-content shadow-2xl absolute mt-2 md:mt-0 md:top-[33%]">
            <li>
              <a href="/" className="p-8">
                <div className="material-icons-outlined scale-150">book</div>
              </a>
            </li>
            <li>
              <a href="/" className="p-8">
                <span className="material-icons-outlined scale-150">book</span>
              </a>
            </li>
            <li>
              <a href="/" className="p-8">
                <span className="material-icons-outlined scale-150">book</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

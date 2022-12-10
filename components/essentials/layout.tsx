import React from "react";
import { Navbar } from "./navbar";

export function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="m-5">{props.children}</div>
    </>
  );
}
export function DisruptiveLayout(props: { children: JSX.Element }) {
  return (
    <>
      <div className="w-screen h-screen fixed z-10">
        <div className="w-full h-full backdrop-blur-md flex justify-center items-center animation-fadein">
          {props.children}
        </div>
      </div>
    </>
  );
}

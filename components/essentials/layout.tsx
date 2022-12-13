import React, { FunctionComponent } from "react";
import { Navbar } from "./navbar";

// HERE Go Types

export function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="m-5 px-4">{props.children}</div>
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

export const DisruptiveCard = (props: { children: JSX.Element }) => {
  return (
    <>
      <div className="animation-slidein w-5/6 h-5/6 bg-base-100 shadow-2xl rounded-xl">
        {props.children}
      </div>
    </>
  );
};

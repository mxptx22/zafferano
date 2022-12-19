import React, { FunctionComponent, useEffect, useRef } from "react";
import { Navbar } from "./navbar";

import {
  enableBodyScroll,
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from "body-scroll-lock";

// HERE Go Types

export function Layout(props: { children: JSX.Element }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="m-2 md:m-5 px-4">{props.children}</div>
    </>
  );
}
export function DisruptiveLayout(props: { children: JSX.Element }) {
  return (
    <>
      <div className="w-screen h-screen fixed z-30">
        <div className="w-full h-full backdrop-blur-md flex justify-center items-center animation-fadein">
          {props.children}
        </div>
      </div>
    </>
  );
}

export const DisruptiveCard = (props: { children: JSX.Element }) => {
  // Scroll Lock Stuff

  const cardRef: any = useRef();
  const targetElement = cardRef.current;

  useEffect(() => {
    disableBodyScroll(targetElement);
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className="animation-slidein w-5/6 h-5/6 bg-base-100 shadow-2xl rounded-xl">
        {props.children}
      </div>
    </>
  );
};

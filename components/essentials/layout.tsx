import React, { ReactNode, useEffect, useRef, useState } from "react";
import { NavbarV } from "./navbar";
import {
  enableBodyScroll,
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from "body-scroll-lock";
import { DividerFive } from "../backgrounds/dividers";

// HERE Go Types
type IMainButtonProp = {
  icon: ReactNode;
  activity: () => void;
};

export function Layout(props: {
  mainButton: IMainButtonProp;
  children: JSX.Element;
  header: string;
}) {
  // HERE Go Auxiliary Functions

  const useHeight = () => {
    const [height, setHeight] = useState(0);
    const handleResize = () => setHeight(window.innerHeight);
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);
    return height;
  };

  return (
    <>
      <div
        className="flex w-screen overflow-auto"
        style={{ height: { useHeight } + "px" }}>
        <div className=" w-full h-screen overflow-scroll">
          <div className="w-full p-2 md:p-8 pt-6 pb-8">
            <header className="justify-start relative -ml-2">
              <div className="w-20 -mr-16 md:-mr-10 fill-base-content opacity-[0.15] -z-10">
                <DividerFive />
              </div>
              <h1>{props.header}</h1>
            </header>
            {props.children}
          </div>
        </div>
        <div className="w-14" style={{ height: { useHeight } + "px" }}>
          <NavbarV
            icon={props.mainButton.icon}
            activity={props.mainButton.activity}
          />
        </div>
      </div>
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

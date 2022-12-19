import React, { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { NavbarV } from "./navbar";
import {
  enableBodyScroll,
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from "body-scroll-lock";
import { IconType } from "react-icons/lib";
import { DividerFive } from "../backgrounds/dividers";

type IMainButtonProp = {
  icon: ReactNode;
  activity: () => void;
};

// HERE Go Types

export function Layout(props: {
  mainButton: IMainButtonProp;
  children: JSX.Element;
  header: string;
}) {
  return (
    <>
      <div className="flex h-screen w-screen overflow-auto">
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
        <div className="w-14 h-screen">
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

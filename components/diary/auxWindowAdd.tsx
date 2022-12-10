import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { FunctionComponent } from "react";
import { DisruptiveLayout } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";

interface Props {
  windowState: IWindowStateOne;
  setWindowState: Function;
}

const AuxWindowAdd: FunctionComponent<Props> = ({
  windowState,
  setWindowState,
}) => {
  const auxWindowClose = () => {
    setWindowState({ auxWindow: false, auxDisplayStep: "Search" });
  };

  return (
    <>
      <DisruptiveLayout>
        <div className="animation-slidein w-5/6 h-5/6 bg-base-100 shadow-2xl rounded-xl p-9">
          <header>
            <h1>Search</h1>
            <div>
              <button
                className="btn btn-square btn-primary"
                onClick={() => auxWindowClose()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>
          <div>hello</div>
        </div>
      </DisruptiveLayout>
    </>
  );
};

export default AuxWindowAdd;

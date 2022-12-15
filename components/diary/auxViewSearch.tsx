import React, { useState, ChangeEvent } from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";

type Props = {
  auxWindowClose: () => void;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
  setSearchInput: Function;
  searchInput: string;
};

const AuxViewSearch = ({
  auxWindowClose,
  setSearchInput,
  setWindowState,
  searchInput,
}: Props) => {
  // Here go auxiliary functions
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleProgression = () => {
    //   Low-key you can animate further by adding fadeout animation plus setTimeout
    searchInput.length > 0 &&
      setWindowState({ auxDisplayStep: "Choose", auxWindow: true });
  };

  return (
    <>
      <DisruptiveCard>
        <>
          <div className="p-12">
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
            <div className="w-full h-2/3 flex justify-center items-center px-8 gap-4 flex-col">
              <input
                value={searchInput}
                onChange={handleInput}
                className="input input-primary input-lg w-full text-center text-2xl"
              />
              <button
                className="btn btn-primary btn-xl text-xl"
                onClick={() => {
                  handleProgression();
                }}>
                <span className="material-icons-outlined iconic-l">
                  manage_search
                </span>
                Search
              </button>
            </div>
          </div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewSearch;

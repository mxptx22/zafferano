import React, { useState, ChangeEvent } from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import Champignons from "../backgrounds/champignons";
// @ts-ignore
import useKeypress from "react-use-keypress";
import { MdManageSearch } from "react-icons/md";

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

  useKeypress("Enter", () => {
    handleProgression();
  });

  return (
    <>
      <DisruptiveCard>
        <>
          <div className="p-6 md:p-12 h-full relative flex flex-col items-stretch">
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
            <div className="w-full h-fit flex justify-center items-center mt-28 md:px-8 gap-4 flex-col">
              <input
                value={searchInput}
                onChange={handleInput}
                className="input input-primary input-lg w-full text-center text-2xl"
              />
              <button
                className="btn btn-primary btn-xl text-xl z-10"
                onClick={() => {
                  handleProgression();
                }}>
                <span className="iconic-l text-2xl">
                  <MdManageSearch />
                </span>
                Search
              </button>
            </div>
            <div className="absolute bottom-0 self-center h-1/2 w-[90%] fill-primary overflow-hidden opacity-20 z-0">
              <Champignons />
            </div>
          </div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewSearch;

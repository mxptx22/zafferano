import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { FunctionComponent, useState } from "react";
import { DisruptiveCard, DisruptiveLayout } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import AuxViewSearch from "./auxViewSearch";
import AuxViewChoose from "./auxViewChoose";

interface Props {
  windowState: IWindowStateOne;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
}

const AuxWindowAdd: FunctionComponent<Props> = ({
  // Do not delete window state - you will need it in the future to determine content visibility
  windowState,
  setWindowState,
}) => {
  // Here go auxiliary functions
  const [searchInput, setSearchInput] = useState<string>("");
  const auxWindowClose = () => {
    // This function you will pass further to keep it in one place - like search input erasure
    setWindowState({ auxWindow: false, auxDisplayStep: "Search" });
    setSearchInput("");
  };

  return (
    <>
      <DisruptiveLayout>
        <>
          {windowState.auxDisplayStep == "Search" && (
            <AuxViewSearch
              auxWindowClose={auxWindowClose}
              setSearchInput={setSearchInput}
              setWindowState={setWindowState}
              searchInput={searchInput}
            />
          )}
          {windowState.auxDisplayStep == "Choose" && (
            <AuxViewChoose
              auxWindowClose={auxWindowClose}
              setSearchInput={setSearchInput}
              setWindowState={setWindowState}
              searchInput={searchInput}
            />
          )}
        </>
      </DisruptiveLayout>
    </>
  );
};

export default AuxWindowAdd;

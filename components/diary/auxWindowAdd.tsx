import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { FunctionComponent, useState } from "react";
import { DisruptiveCard, DisruptiveLayout } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import AuxViewSearch from "./auxViewSearch";
import AuxViewChoose from "./auxViewChoose";
import AuxViewConfirm from "./auxViewConfirm";

// HERE go types
interface Props {
  windowState: IWindowStateOne;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
}

const AuxWindowAdd: FunctionComponent<Props> = ({
  // MEMO Do not delete window state - you will need it in the future to determine content visibility
  windowState,
  setWindowState,
}) => {
  // HERE go auxiliary functions
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectionRecipe, setSelectionRecipe] = useState<object>();
  const auxWindowClose = () => {
    // MEMO This function you will pass further to keep it in one place - like search input erasure
    setWindowState({ auxWindow: false, auxDisplayStep: "Search" });
    setSearchInput("");
    setSelectionRecipe(undefined);
  };

  // HERE goes the layout
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
              setSelectionRecipe={setSelectionRecipe}
              setWindowState={setWindowState}
              searchInput={searchInput}
            />
          )}
          {windowState.auxDisplayStep == "Confirm" && (
            <AuxViewConfirm
              auxWindowClose={auxWindowClose}
              setWindowState={setWindowState}
              selectionRecipe={selectionRecipe}
              setSelectionRecipe={setSelectionRecipe}
            />
          )}
        </>
      </DisruptiveLayout>
    </>
  );
};

export default AuxWindowAdd;

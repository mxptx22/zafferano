import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";

// HERE Go types

type Props = {
  auxWindowClose: Function;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
  setSelectionRecipe: React.Dispatch<React.SetStateAction<object>>;
  selectionRecipe: Record<string, any> | undefined;
};

const AuxViewConfirm: FunctionComponent<Props> = ({
  auxWindowClose,
  setWindowState,
  setSelectionRecipe,
  selectionRecipe,
}) => {
  // HERE Go auxiliary functions

  const handleProgression = () => {
    auxWindowClose();
    // setWindowState({ auxDisplayStep: "Choose", auxWindow: true });
  };

  // HERE Goes the layout
  return (
    <>
      <DisruptiveCard>
        <>
          <header>
            <h1>Confirm {selectionRecipe && selectionRecipe.strMeal}</h1>
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
          <div className="w-full h-2/3 flex justify-center items-center px-8 gap-4 flex-col"></div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewConfirm;

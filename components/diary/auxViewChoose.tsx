import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { DisruptiveCard } from "../essentials/layout";
import { IWindowStateOne } from "../../pages/index";
import { ISelectionRecipe } from "../../models/recipe";
import {
  LoadingBumper,
  ErrorBumper,
  NOResultsBumper,
} from "../essentials/bumpers";

// HERE Go types
type IOutput = {
  success: boolean;
  data?: any;
};

type Props = {
  auxWindowClose: () => void;
  setWindowState: React.Dispatch<React.SetStateAction<IWindowStateOne>>;
  setSelectionRecipe: React.Dispatch<
    React.SetStateAction<Partial<ISelectionRecipe> | undefined>
  >;
  searchInput: string;
};

const AuxViewChoose = ({
  auxWindowClose,
  setWindowState,
  searchInput,
  setSelectionRecipe,
}: Props) => {
  // HERE Go auxiliary functions

  type IFetchStatus = "Successful" | "Erroneous" | "Vacuous" | "Awaiting";
  type IFetchData = Array<any>;

  const [fetchStatus, setFetchStatus] = useState<IFetchStatus>("Awaiting");
  const [fetchData, setFetchData] = useState<IFetchData>([]);

  const handleRegression = () => {
    setWindowState({ auxDisplayStep: "Search", auxWindow: true });
    setFetchData([]);
    setFetchStatus("Awaiting");
  };

  const handleProgression = () => {
    setWindowState({ auxDisplayStep: "Confirm", auxWindow: true });
  };

  const handleFetch = async () => {
    let output: IOutput;
    try {
      const response = await fetch("/api/resources/find", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: searchInput,
        }),
      });

      output = await response.json();
      if (output.success) {
        if (output.data.meals) {
          setFetchStatus("Successful");
          setFetchData(output.data.meals);
        } else {
          setFetchStatus("Vacuous");
        }
      } else {
        setFetchStatus("Erroneous");
        throw new Error(
          "Fetch error: We got a response from the server but the it failed to connect to the external source."
        );
      }
    } catch (err) {
      console.log(err);
      setFetchStatus("Erroneous");
    }
  };

  const handleRender = useMemo(() => {
    // FIXME we're not quite there yet but perhaps putting useEffect in auxWindowAdd might help with performance - fiddle with useEffect
    if (fetchData.length == 0) {
      return;
    } else if (fetchData.length > 0) {
      return fetchData.map((item, index) => (
        <div className="card h-80 bg-base-100 shadow-xl">
          <figure className="w-full h-1/3">
            <img src={item.strMealThumb} alt={`Image of ${item.strMeal}`} />
          </figure>
          <div className="card-body">
            <h3 className="card-title">{item.strMeal}</h3>
            <p>
              {item.strArea} - {item.strCategory}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSelection(index);
                }}>
                Choose
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return;
    }
  }, [fetchData]);

  const handleSelection = (key: number) => {
    console.log(fetchData[key]);
    setSelectionRecipe(fetchData[key]);
    handleProgression();
  };

  useEffect(() => {
    handleFetch();
  }, [searchInput]);

  // HERE Goes the layout
  return (
    <>
      <DisruptiveCard>
        <>
          <div className="flex flex-col h-full w-full justify-between p-12">
            <header className="h-fit">
              <h1>Choose</h1>
              <div id="container-button" className="flex gap-2">
                <button
                  id="button-return"
                  className="btn btn-square btn-primary"
                  onClick={() => handleRegression()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                  </svg>
                </button>
                <button
                  id="button-close"
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

            {fetchStatus == "Successful" && (
              <>
                <div className="grid grid-cols-3 items-stretch w-full h-full overflow-scroll gap-4 justify-between -mb-12 pb-8 px-4">
                  {handleRender}
                </div>
              </>
            )}
            {fetchStatus == "Awaiting" && (
              <LoadingBumper abortFunction={handleRegression} />
            )}
            {fetchStatus == "Erroneous" && (
              <ErrorBumper abortFunction={auxWindowClose} />
            )}
            {fetchStatus == "Vacuous" && (
              <NOResultsBumper abortFunction={handleRegression} />
            )}
          </div>
        </>
      </DisruptiveCard>
    </>
  );
};

export default AuxViewChoose;
